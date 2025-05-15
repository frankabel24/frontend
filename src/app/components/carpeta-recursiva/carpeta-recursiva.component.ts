import { Component, input, signal, inject, output, EventEmitter } from '@angular/core';
import { Directorio } from '../../interfaces/directorio.interface';
import { ModuleService } from '../../services/module.service';
import { Reporte } from '../../interfaces/reporte.interface';
import { Folder } from '../../interfaces/folder.interface';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-carpeta-recursiva',
  imports: [],
  templateUrl: './carpeta-recursiva.component.html',
})
export class CarpetaRecursivaComponent {
  moduloService = inject(ModuleService)
  carpeta = input.required<Directorio>();
  public hoveredItem = output<{ id: number, tipo: 'carpeta' | 'reporte' }>();
  folder = signal<Folder>({} as Folder);


  onClick(evento: { id: number, tipo: 'carpeta' | 'reporte' }) {

    this.hoveredItem.emit(evento);

  }


}
