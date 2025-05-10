import { Component, input, signal } from '@angular/core';
import { Directorio } from '../../interfaces/directorio.interface';

@Component({
  selector: 'app-carpeta-recursiva',
  imports: [],
  templateUrl: './carpeta-recursiva.component.html',
})
export class CarpetaRecursivaComponent {
  carpeta = input.required<Directorio>();



}
