import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FilterComponent } from '../../../components/filter/filter.component';
import { ModuleService } from '../../../services/module.service';
import { FormUtils } from '../../../utils/form-utils';
import { Reporte } from '../../../interfaces/reporte.interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-nuevo-reporte-listado',
  imports: [FilterComponent, ReactiveFormsModule, CdkDrag, CdkDropList, CdkDropListGroup, RouterLink, RouterLinkActive],
  templateUrl: './nuevo-reporte-listado.component.html',
})
export class NuevoReporteListadoComponent {
  fb = inject(FormBuilder);
  moduloService = inject(ModuleService);
  formUtils = FormUtils;
  filtrosSeleccionados = signal<string>('');
  dialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  message = signal<string>('');


  campos = [
    'Primer Nombre',
    'Género',
    'Facultad',
    'Edad',
    'Grupo',
    'Curso'

  ]

  camposSeleccionados: string[] = [];



  myForm: FormGroup = this.fb.group({
    titulo_reporte: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z0-9\\s_]+$')]],
    realizado_por: ['Frank Abel'],
    descripcion: ['', Validators.required],
    filtros: [''],
    campos_seleccionados: [''],
    id_tipo_contenido: [2],
    id_padre: [],
    id_tipo_reporte: [2],
  })

  get reportePath() {
    return this.moduloService.getReportePath();
  }

  LlenarFiltro(evento: string) {
    this.filtrosSeleccionados.set(evento);
    this.myForm.get('filtros')!.setValue(this.filtrosSeleccionados());

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
        this.router.navigate(['/dashboard-' + this.moduloService.getType().toLowerCase()]);
      }
    });
  }


  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.camposSeleccionados.length == 0) {
      this.message.set('Tiene que seleccionar las columnas del reporte');
    } else {
      const elemento = this.moduloService.elemento();

      if (elemento.tipo === 'reporte') {
        this.myForm.get('id_padre')!.setValue(this.moduloService.reporte().id_padre);
      } else {
        this.myForm.get('id_padre')!.setValue(elemento.id);
      }

      const isValid = this.myForm.valid;
      if (!isValid) return;

      const reporte: Reporte = {
        ...this.myForm.value,
        campos_seleccionados: this.camposSeleccionados.map(campo => campo.trim()).join(', ')
      };

      this.moduloService.createReporte(reporte).subscribe({
        next: (response) => {
          console.log('[DEBUG] Reporte creado:', response);
          this.snackBar.open('Reporte creado satisfactoriamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['custom-snackbar']
          });
          this.router.navigate([`/dashboard-${this.moduloService.getType()}`]);
        },
        error: (error) => {
          console.error('[ERROR] No se pudo crear el reporte:', error);
          this.snackBar.open('Error al crear el reporte', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }


  }

}
