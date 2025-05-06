import { Component, inject, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service.ts.service';
import { SideMenuContentComponent } from "./side-menu-content/side-menu-content.component";
import { SideMenuReportsComponent } from "./side-menu-reports/side-menu-reports.component";

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  imports: [SideMenuContentComponent, SideMenuReportsComponent]
})

export class SideMenuComponent {
  moduloService = inject(ModuleService)
}
