import { Component, inject, signal } from '@angular/core';
import { ModuleService } from '../../../services/module.service';
import { Reporte } from '../../../interfaces/reporte.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-mostrar-reporte-listado',
  imports: [],
  templateUrl: './mostrar-reporte-listado.component.html',
})
export class MostrarReporteListadoComponent {

  activatedRoute = inject(ActivatedRoute);
  moduloService = inject(ModuleService);
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
}








