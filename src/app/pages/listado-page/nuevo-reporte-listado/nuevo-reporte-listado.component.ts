import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FilterComponent } from '../../../components/filter/filter.component';
import { ModuleService } from '../../../services/module.service';
import { FormUtils } from '../../../utils/form-utils';
import { Reporte } from '../../../interfaces/reporte.interface';
import { Folder } from '../../../interfaces/folder.interface';


@Component({
  selector: 'app-nuevo-reporte-listado',
  imports: [FilterComponent, ReactiveFormsModule, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './nuevo-reporte-listado.component.html',
})
export class NuevoReporteListadoComponent {
  fb = inject(FormBuilder);
  moduloService = inject(ModuleService);
  formUtils = FormUtils;
  filtrosSeleccionados = signal<string>('');
  idPadre = signal<number>(0);
  tipoReporte = signal<number>(0);
  reporte = signal<Reporte>({} as Reporte)
  carpeta = signal<Folder>({} as Folder)

  campos = [
    'Primer Nombre',
    'Segundo Nombre',
    'Género',
    'Facultad',
    'Edad',
    'Grupo'

  ]

  camposSeleccionados: string[] = [];



  myForm: FormGroup = this.fb.group({
    titulo_reporte: ['', [Validators.required, Validators.minLength(3)]],
    realizado_por: ['Frank Abel'],
    descripcion: ['', Validators.required],
    filtros: [''],
    campos_seleccionados: [''],
    id_tipo_contenido: [2],
    id_padre: [],
    id_tipo_reporte: [2],
  })

  LlenarFiltro(evento: string) {
    this.filtrosSeleccionados.set(evento);
    this.myForm.get('filtros')!.setValue(this.filtrosSeleccionados());

  }

  ObtenerIdPadre(elemento: { id: number, tipo: 'carpeta' | 'reporte' }) {

    if (elemento.tipo === 'reporte') {

      this.moduloService.obtenerReporteById(elemento.id).subscribe((resp) => {
        this.reporte.set(resp);

        console.log(this.reporte());
      });

    }

    if (elemento.tipo === 'carpeta') {
      this.moduloService.obtenerCarpetaById(elemento.id).subscribe((resp) => {
        this.carpeta.set(resp);
        console.log(this.carpeta());
        console.log('Entre a las careptas y te di la que tenia ese id');
      })
    }
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

  onSubmit() {
    const elemento = this.moduloService.elemento();
    console.log({ elemento });
    this.ObtenerIdPadre(elemento);
    if (elemento.tipo === 'reporte') {
      this.myForm.get('id_padre')!.setValue(this.reporte().id_padre);

    }
    if (elemento.tipo === 'carpeta') {
      this.myForm.get('id_padre')!.setValue(this.carpeta().id);
    }

    const reporte: Reporte = {
      ...this.myForm.value,
    };

    console.log(reporte);

  }
}
