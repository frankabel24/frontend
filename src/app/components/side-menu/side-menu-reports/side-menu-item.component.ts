import { Component, inject, input } from '@angular/core';
import { ModuleService } from '../../../services/module.service';
import { ReportType } from '../../../interfaces/report-type.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-item.component.html',
})
export class SideMenuItemComponent {
  moduloService = inject(ModuleService);
  reportes = input.required<ReportType[]>();

  getPath = this.moduloService.getType();
}
