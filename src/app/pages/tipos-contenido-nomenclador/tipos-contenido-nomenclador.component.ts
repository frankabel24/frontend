import { Component, inject } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-tipos-contenido-nomenclador',
  imports: [SideMenuComponent],
  templateUrl: './tipos-contenido-nomenclador.component.html',
})
export default class TiposContenidoNomencladorComponent {
  moduloService = inject(ModuleService);
  router = inject(Router)

  constructor() {
    this.moduloService.getContentTypes();
  }

  onCancel() {
    this.router.navigate([`/dashboard-listado`])
  }
}
