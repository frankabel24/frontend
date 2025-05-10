import { Component, inject, input, signal } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { CarpetaRecursivaComponent } from "../../components/carpeta-recursiva/carpeta-recursiva.component";
import { Directorio } from '../../interfaces/directorio.interface';

@Component({
  selector: 'app-directorio',
  imports: [CarpetaRecursivaComponent],
  templateUrl: './directorio.component.html',
})
export class DirectorioComponent {

  directorio = input.required<Directorio[]>()


}
