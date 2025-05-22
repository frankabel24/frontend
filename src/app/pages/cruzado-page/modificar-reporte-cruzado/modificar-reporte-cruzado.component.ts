import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterComponent } from '../../../components/filter/filter.component';
import { ModuleService } from '../../../services/module.service';
import { FormUtils } from '../../../utils/form-utils';
import { Reporte } from '../../../interfaces/reporte.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-reporte-cruzado',
  imports: [FilterComponent, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './modificar-reporte-cruzado.component.html',
})
export class ModificarReporteCruzadoComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);
  moduloService = inject(ModuleService);
  fb = inject(FormBuilder);
  reporte = signal<Reporte>({} as Reporte);
  formUtils = FormUtils;
  filtrosSeleccionados = signal<string>('');
  isEditMode = false;
  camposSeleccionados: string[] = [];
  snackBar = inject(MatSnackBar);
  camposDisponibles: string[] = [];
  message = signal<string>('');
  filasSeleccionadas: string[] = [];
  columnasSeleccionadas: string[] = [];

  campos = [
    'Primer Nombre',
    'Segundo Nombre',
    'Género',
    'Facultad',
    'Edad',
    'Grupo'

  ]



  reporteId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );




  myForm: FormGroup = this.fb.group({
    titulo_reporte: ['', [Validators.required, Validators.minLength(3)]],
    realizado_por: ['Frank Abel'],
    descripcion: ['', Validators.required],
    filtros: [''],
    campos_seleccionados: [''],
    id_tipo_contenido: [2],
    id_padre: [],
    id_tipo_reporte: [3],
  })

  ngOnInit(): void {

    this.checkEditMode();
  }

  private checkEditMode() {
    const id = this.reporteId();
    if (id) {
      this.isEditMode = true;
      this.loadReporte();
    }
  }

  private loadReporte() {
    this.moduloService.obtenerReporteById(this.reporteId()).subscribe({
      next: (reporte) => {
        this.myForm.patchValue({
          titulo_reporte: reporte.titulo_reporte,
          realizado_por: reporte.realizado_por,
          descripcion: reporte.descripcion,
          filtros: reporte.filtros,
          id_padre: reporte.id_padre,
          id_tipo_contenido: reporte.id_tipo_contenido,
          id_tipo_reporte: reporte.id_tipo_reporte
        });

        this.filtrosSeleccionados.set(reporte.filtros);

        this.camposSeleccionados = reporte.campos_seleccionados
          .split(',')
          .map(campo => campo.trim());

        //Actualiza campos disponibles
        this.camposDisponibles = this.campos.filter(campo =>
          !this.camposSeleccionados.includes(campo));


        setTimeout(() => {
          this.filtrosSeleccionados.update(prev => prev);
        }, 0);
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
        this.router.navigate(['/dashboard-listado']);
      }
    });
  }

  seleccionarCampo(evento: Event, tipo: 'filas' | 'columnas') {
    const valor = (evento.target as HTMLSelectElement).value;

    if (tipo === 'filas') {

      this.filasSeleccionadas = [valor];
      console.log(this.filasSeleccionadas.length);

    } else {

      this.columnasSeleccionadas = [valor];
      console.log(this.columnasSeleccionadas.length);

    }
  }

  obtenerValorSeleccionado(tipo: 'filas' | 'columnas'): string {
    if (tipo === 'filas') {
      return this.camposSeleccionados[0] || '';
    } else {
      return this.camposSeleccionados[1] || '';
    }
  }

  estaSeleccionado(campo: string, tipo: 'filas' | 'columnas'): boolean {
    if (tipo === 'filas') {
      return this.camposSeleccionados[0] === campo;
    } else {
      return this.camposSeleccionados[1] === campo;
    }
  }


  LlenarFiltro(evento: string) {
    this.filtrosSeleccionados.set(evento);
    this.myForm.get('filtros')!.setValue(this.filtrosSeleccionados());
    console.log(this.filtrosSeleccionados());

  }

  onCancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Cancelar Acción',
        mensaje: '¿Está seguro de cancelar la acción? Se perderán todos los cambios realizados.',
        botonAceptar: 'Cancelar',
        botonCancelar: 'Continuar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate([`/dashboard-${this.moduloService.getType()}`]);
      }
    });
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.filasSeleccionadas.length == 0 || this.columnasSeleccionadas.length == 0) {
      this.message.set('Debe seleccionar tanto filas como columnas para el reporte');
      return;
    }

    const reporte: Reporte = {
      ...this.myForm.value,
      campos_seleccionados: [...this.filasSeleccionadas, ...this.columnasSeleccionadas]
        .map(campo => campo.trim())
        .join(', ')
    };

    this.moduloService.updateReporte(this.reporteId(), reporte).subscribe({
      next: (response) => {
        console.log('Reporte actualizado exitosamente:', response);

        // Mostrar notificación
        this.snackBar.open('Reporte modificado satisfactoriamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });

        this.router.navigate([`/dashboard-${this.moduloService.getType()}`]);
      },
      error: (error) => {
        console.error('Error al actualizar el reporte:', error);
        // Manejar el error según tus necesidades
      }
    });



  }
}
