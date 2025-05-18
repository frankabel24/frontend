import { Component, input, inject, output } from '@angular/core';
import { Directorio } from '../../interfaces/directorio.interface';

@Component({
  selector: 'app-carpeta-recursiva',
  imports: [],
  templateUrl: './carpeta-recursiva.component.html',
})
export class CarpetaRecursivaComponent {
  carpeta = input.required<Directorio>();
  public hoveredItem = output<{ id: number, tipo: 'carpeta' | 'reporte' }>();

  onClick(evento: { id: number, tipo: 'carpeta' | 'reporte' }) {

    this.hoveredItem.emit(evento);

  }

}
