import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';

import { SideMenuComponent } from "../../../components/side-menu/side-menu.component";
import { DirectorioComponent } from "../../directorio/directorio.component";
import { DetailsPageComponent } from "../../details-page/details-page.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { ModuleService } from '../../../services/module.service';
import { Directorio } from '../../../interfaces/directorio.interface';

@Component({
  selector: 'app-listado-page',
  imports: [SideMenuComponent, DetailsPageComponent, HeaderComponent, DirectorioComponent],
  templateUrl: './listado-page.component.html',
})
export default class ListadoPageComponent {
  moduloService = inject(ModuleService);
  directorio = signal<Directorio[]>([]);
  hoveredItem = signal<{ id: number, tipo: 'carpeta' | 'reporte' }>({
    id: 0,
    tipo: 'carpeta'
  });
  selectedItem = signal<{ id: number, tipo: 'carpeta' | 'reporte' } | null>(null);



  constructor() {
    this.moduloService.setType('listado');
    this.moduloService.getDirectorio(2).subscribe((resp) => {
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
