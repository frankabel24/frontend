import { Component, inject, signal } from '@angular/core';

import { SideMenuComponent } from "../../components/side-menu/side-menu.components";
import { DirectorioComponent } from "../directorio/directorio.component";
import { DetailsPageComponent } from "../details-page/details-page.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ModuleService } from '../../services/module.service';
import { Directorio } from '../../interfaces/directorio.interface';

@Component({
  selector: 'app-listado-page',
  imports: [SideMenuComponent, DetailsPageComponent, HeaderComponent, DirectorioComponent],
  templateUrl: './listado-page.component.html',
})
export default class ListadoPageComponent {
  moduloService = inject(ModuleService);
  directorio = signal<Directorio[]>([]);

  constructor() {
    this.moduloService.getDirectorio(2).subscribe((resp) => {
      this.directorio.set(resp);
      console.log({ resp });
    })
  }


}
