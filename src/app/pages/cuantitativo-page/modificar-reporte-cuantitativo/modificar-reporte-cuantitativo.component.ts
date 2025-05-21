import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FilterComponent } from '../../../components/filter/filter.component';
import { ModuleService } from '../../../services/module.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormUtils } from '../../../utils/form-utils';
import { Reporte } from '../../../interfaces/reporte.interface';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-reporte-cuantitativo',
  imports: [FilterComponent, ReactiveFormsModule, CdkDrag, CdkDropList, CdkDropListGroup, RouterLink, RouterLinkActive],
  templateUrl: './modificar-reporte-cuantitativo.component.html',
})
export class ModificarReporteCuantitativoComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);
  moduloService = inject(ModuleService);
  fb = inject(FormBuilder);
  reporte = signal<Reporte>({} as Reporte);
  formUtils = FormUtils;
  filtrosSeleccionados = signal<string>('');
  isEditMode = false;
  snackBar = inject(MatSnackBar);
  camposFiltrados = [''];
  message = signal<string>('');
  camposDisponibles: string[] = [];  // Campos que aún no están seleccionados
  camposSeleccionados: string[] = []; // Campos ya seleccionados

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
    id_tipo_reporte: [1],
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


        //Actualiza los campos seleccionados
        this.camposSeleccionados = reporte.campos_seleccionados
          .split(',')
          .map(campo => campo.trim());
        console.log('SELECCIONADOS', this.camposSeleccionados)

        //Actualiza campos disponibles
        this.camposDisponibles = this.campos.filter(campo =>
          !this.camposSeleccionados.includes(campo));
        console.log('DISPONIBLES', this.camposDisponibles)

        setTimeout(() => {
          this.filtrosSeleccionados.update(prev => prev);
        }, 0);
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
        this.router.navigate([`/dashboard-${this.moduloService.getType()}`]);
      }
    });
  }


  LlenarFiltro(evento: string) {
    this.filtrosSeleccionados.set(evento);
    this.myForm.get('filtros')!.setValue(this.filtrosSeleccionados());
    console.log(this.filtrosSeleccionados());

  }



  drop(evento: CdkDragDrop<string[]>) {

    const { previousIndex, currentIndex, container, previousContainer } = evento;


    if (container === previousContainer) {

      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      const nuevosCamposSeleccionados = [...this.camposSeleccionados];
      this.myForm.get('campos_seleccionados')!.setValue(nuevosCamposSeleccionados);
    }
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
        this.router.navigate(['/dashboard-' + this.moduloService.getType()]);
      }
    });
  }

  onSubmit() {
    if (!this.myForm.valid) return;

    if (this.camposSeleccionados.length == 0) {
      this.message.set('Tiene que seleccionar las columnas del reporte')
    } else {
      const report: Reporte = {
        ...this.myForm.value,
        campos_seleccionados: this.camposSeleccionados.map(campo => campo.trim()).join(', ')
      };

      this.moduloService.updateReporte(this.reporteId(), report).subscribe({
        next: (response) => {
          console.log('Reporte actualizado exitosamente:', response);

          // Mostrar notificación
          this.snackBar.open('Reporte modificado satisfactoriamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-snackbar']
          });

          this.router.navigate(['/dashboard-' + this.moduloService.getType()]);
        },
        error: (error) => {
          console.error('Error al actualizar el reporte:', error);
          // Manejar el error según tus necesidades
        }
      });
    }
  }

}
