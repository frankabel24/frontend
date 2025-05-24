import { Component, inject, signal } from '@angular/core';
import { ModuleService } from '../../../services/module.service';
import { Reporte } from '../../../interfaces/reporte.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mostrar-reporte-listado',
  imports: [],
  templateUrl: './mostrar-reporte-listado.component.html',
})
export class MostrarReporteListadoComponent {

  activatedRoute = inject(ActivatedRoute);
  moduloService = inject(ModuleService);
  router = inject(Router);
  reporte = signal<Reporte>({} as Reporte);
  camposSeleccionados = signal<string[]>([]);

  reporteId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  ngOnInit() {
    this.cargarReporte();
  }

  cargarReporte() {
    const id = this.reporteId();
    this.moduloService.obtenerReporteById(id).subscribe({
      next: (reporte) => {
        this.reporte.set(reporte);
        // Procesamos los campos seleccionados cuando recibimos el reporte
        this.camposSeleccionados.set(
          reporte.campos_seleccionados.split(',')
            .map(campo => campo.trim())
        );
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
      }
    });
  }

  exportarPDF() {
    const datosReporte = {
      titulo_reporte: this.reporte().titulo_reporte,
      campos_seleccionados: this.reporte().campos_seleccionados,
    };

    this.moduloService.exportarReporte(datosReporte).subscribe({
      next: (response: HttpResponse<Blob>) => {
        const blob = response.body as Blob;
        if (!blob) {
          console.error('No se recibió el PDF');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${datosReporte.titulo_reporte}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al exportar PDF:', error);
      }
    });
  }

  onCancel() {
    this.router.navigate([`/dashboard-${this.moduloService.getType()}`])
  }

  exportarAPDF() {
    const element = document.getElementById('tabla-reporte');
    if (!element) return;

    // Configuración de html2canvas (sin 'quality' que causa error)
    html2canvas(element, {
      scale: 2,                   // Escala balanceada (2x)
      useCORS: true,              // Permite imágenes externas
      backgroundColor: '#FFFFFF', // Fondo blanco (evita transparencias pesadas)
      logging: false              // Desactiva logs en consola
    }).then(canvas => {
      // Inicializar PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Convertir canvas a JPEG con calidad 0.75 (reducción de peso clave)
      const contentDataURL = canvas.toDataURL('image/jpeg', 0.75);

      // Tamaño de la imagen (ancho fijo 150mm, alto proporcional)
      const imgWidth = 150;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Función de encabezado (logo + texto)
      const addHeader = () => {

        const logoUrl = '/logo.png';
        pdf.addImage(logoUrl, 'PNG', 15, 7, 35, 15);

        // Texto azul oscuro (RGB: 0, 51, 102)
        pdf.setTextColor(0, 51, 102);

        // "Realizado por" (derecha, tamaño 9)
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const realizadoPor = `Realizado por: ${this.reporte().realizado_por}`;
        pdf.text(realizadoPor, pageWidth - 15, 18, { align: 'right' });

        // Universidad (derecha, tamaño 8)
        pdf.setFontSize(8);
        pdf.text('Universidad de las Ciencias Informáticas', pageWidth - 15, 22, { align: 'right' });

        // Línea separadora gris
        pdf.setDrawColor(200, 200, 200);
        pdf.line(15, 25, pageWidth - 15, 25);
      };

      // Primera página
      addHeader();

      // Título del reporte (centrado, negro)
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      const title = this.reporte().titulo_reporte;
      const textWidth = pdf.getStringUnitWidth(title) * 16 / pdf.internal.scaleFactor;
      const titleX = (pageWidth - textWidth) / 2;
      pdf.text(title, titleX, 32);

      // Añadir tabla (imagen JPEG comprimida)
      const startY = 40;
      pdf.addImage(
        contentDataURL,
        'JPEG',                          // Formato JPEG
        (pageWidth - imgWidth) / 2,      // Centrado horizontal
        startY,                          // Posición Y
        imgWidth,                        // Ancho
        imgHeight,                       // Alto
        undefined,                       // No alias
        'MEDIUM'                         // Compresión balanceada
      );

      // Paginación para tablas largas
      let heightLeft = imgHeight - (pageHeight - startY - 20);
      let currentPage = 1;

      while (heightLeft > 0 && currentPage < 10) {
        pdf.addPage();
        addHeader();
        pdf.setFontSize(16);
        pdf.text(title, titleX, 32);

        const newY = 40 - (imgHeight - heightLeft - startY);
        pdf.addImage(
          contentDataURL,
          'JPEG',
          (pageWidth - imgWidth) / 2,
          newY,
          imgWidth,
          imgHeight,
          undefined,
          'MEDIUM'
        );
        heightLeft -= (pageHeight - 40);
        currentPage++;
      }

      // Guardar PDF
      pdf.setProperties({
        title: title,
        creator: 'Sistema de Reportes - UCI'
      });
      pdf.save(`${title}.pdf`);
    });
  }

  exportarAXLS() {
    const titulo = this.reporte().titulo_reporte;
    const tabla = document.getElementById('tabla-reporte');

    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();

    // Crear hoja de trabajo con los datos
    const ws = XLSX.utils.table_to_sheet(tabla);

    // Agregar el título como primera fila
    XLSX.utils.sheet_add_aoa(ws, [[titulo]], { origin: 'A1' });

    // Combinar celdas para el título (desde A1 hasta la última columna)
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: range.e.c } }];

    // Estilo para el título (negrita y centrado)
    const titleCell = ws['A1'];
    if (titleCell) {
      titleCell.s = {
        font: { bold: true },
        alignment: { horizontal: 'center' }
      };
    }

    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(workbook, ws, 'Reporte');

    // Exportar el archivo
    XLSX.writeFile(workbook, `${titulo}.xlsx`);
  }
}








