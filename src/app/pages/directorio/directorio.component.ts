import { Component, inject, input, output, signal } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { CarpetaRecursivaComponent } from "../../components/carpeta-recursiva/carpeta-recursiva.component";
import { Directorio } from '../../interfaces/directorio.interface';
import { Folder } from '../../interfaces/folder.interface';
import { Reporte } from '../../interfaces/reporte.interface';

@Component({
  selector: 'app-directorio',
  imports: [CarpetaRecursivaComponent],
  templateUrl: './directorio.component.html',
})
export class DirectorioComponent {

  moduloService = inject(ModuleService);
  directorio = input.required<Directorio[]>();
  item = output<{ id: number, tipo: 'carpeta' | 'reporte' }>();

  obtenerItem(evento: { id: number, tipo: 'carpeta' | 'reporte' }) {
    this.item.emit(evento);
  }



}
