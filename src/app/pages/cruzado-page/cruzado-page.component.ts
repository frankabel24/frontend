import { DirectorioComponent } from './../directorio/directorio.component';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { DetailsPageComponent } from "../details-page/details-page.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.components";
import { ModuleService } from '../../services/module.service';
import { Directorio } from '../../interfaces/directorio.interface';

@Component({
  selector: 'app-cruzado-page',
  imports: [HeaderComponent, DetailsPageComponent, SideMenuComponent, DirectorioComponent],
  templateUrl: './cruzado-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CruzadoPageComponent {
  moduloService = inject(ModuleService);
  directorio = signal<Directorio[]>([]);

  constructor() {
    this.moduloService.getDirectorio(3).subscribe((resp) => {
      this.directorio.set(resp);
      console.log({ resp });
    })
  }
}
