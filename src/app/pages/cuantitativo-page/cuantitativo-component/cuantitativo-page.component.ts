import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { DirectorioComponent } from "../../directorio/directorio.component";
import { DetailsPageComponent } from "../../details-page/details-page.component";
import { SideMenuComponent } from "../../../components/side-menu/side-menu.components";
import { ModuleService } from '../../../services/module.service';
import { Directorio } from '../../../interfaces/directorio.interface';
import { Folder } from '../../../interfaces/folder.interface';
import { Reporte } from '../../../interfaces/reporte.interface';

@Component({
  selector: 'app-cuantitativo-page',
  imports: [HeaderComponent, DetailsPageComponent, SideMenuComponent, DirectorioComponent],
  templateUrl: './cuantitativo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuantitativoPageComponent {
  moduloService = inject(ModuleService);
  directorio = signal<Directorio[]>([]);
  hoveredItem = signal<{ id: number, tipo: 'carpeta' | 'reporte' }>({
    id: 0,
    tipo: 'carpeta'
  });



  constructor() {
    this.moduloService.setType('cuantitativo');
    this.moduloService.getDirectorio(1).subscribe((resp) => {
      this.directorio.set(resp);
    })
  }

  mandarItem(evento: { id: number, tipo: 'carpeta' | 'reporte' }) {
    console.log('Elemento antes de actualizar signal', evento);
    this.hoveredItem.set(evento);
    console.log('Elemento despues de ser guardado en signal', this.hoveredItem());
  }
}
