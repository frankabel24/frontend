import { Component, inject } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipos-contenido-nomenclador',
  imports: [],
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
