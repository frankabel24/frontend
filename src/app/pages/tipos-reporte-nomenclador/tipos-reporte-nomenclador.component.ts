import { Component, inject } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-tipos-reporte-nomenclador',
  imports: [SideMenuComponent],
  templateUrl: './tipos-reporte-nomenclador.component.html',
})
export default class TiposReporteNomencladorComponent {
  moduloService = inject(ModuleService);
  router = inject(Router)

  constructor() {
    this.moduloService.getReportTypes();
  }

  onCancel() {
    this.router.navigate([`/dashboard-listado`])
  }
}
