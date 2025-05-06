import { Component, inject, input } from '@angular/core';
import { ModuleService } from '../../../services/module.service.ts.service';
import { ReportType } from '../../../interfaces/report-type.interface';

@Component({
  selector: 'app-side-menu-reports',
  imports: [],
  templateUrl: './side-menu-reports.component.html',
})
export class SideMenuReportsComponent {
  moduloService = inject(ModuleService);
  reportes = input.required<ReportType[]>();
}
