import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { Folder } from '../../interfaces/folder.interface';
import { Reporte } from '../../interfaces/reporte.interface';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  item = input.required<{ id: number, tipo: 'carpeta' | 'reporte' }>();
  carpeta = signal<Folder>({} as Folder);
  reporte = signal<Reporte>({} as Reporte);
  moduloService = inject(ModuleService);

  constructor() {
    console.log(this.carpeta())
  }



  obtenerDatos() {
    if (this.item().tipo === 'carpeta') {
      this.moduloService.obtenerCarpetaById(this.item().id).subscribe((resp) => {
        this.carpeta.set(resp);
        this.reporte.set({} as Reporte)
        console.log(resp);
      })
    } else {
      this.moduloService.obtenerReporteById(this.item().id).subscribe((resp) => {
        this.reporte.set(resp);
        this.carpeta.set({} as Folder)
        console.log(resp)
      })
    }

  }
}
