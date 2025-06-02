import { DirectorioComponent } from '../../directorio/directorio.component';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { DetailsPageComponent } from "../../details-page/details-page.component";
import { SideMenuComponent } from "../../../components/side-menu/side-menu.component";
import { ModuleService } from '../../../services/module.service';
import { Directorio } from '../../../interfaces/directorio.interface';
import { Folder } from '../../../interfaces/folder.interface';
import { Reporte } from '../../../interfaces/reporte.interface';

@Component({
  selector: 'app-cruzado-page',
  imports: [HeaderComponent, DetailsPageComponent, SideMenuComponent, DirectorioComponent],
  templateUrl: './cruzado-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CruzadoPageComponent {
  moduloService = inject(ModuleService);
  directorio = signal<Directorio[]>([]);
  hoveredItem = signal<{ id: number, tipo: 'carpeta' | 'reporte' }>({
    id: 0,
    tipo: 'carpeta'
  });
  selectedItem = signal<{ id: number, tipo: 'carpeta' | 'reporte' } | null>(null);




  constructor() {
    this.moduloService.setType('cruzado');
    this.moduloService.getDirectorio(3).subscribe((resp) => {
      this.directorio.set(resp);
    });
    effect(() => {
      const item = this.hoveredItem();
      if (item) {
        this.selectedItem.set(item);
      }
    });
  }

  mandarItem(evento: { id: number, tipo: 'carpeta' | 'reporte' }) {

    this.hoveredItem.set(evento);
  }
}
