import { Component, inject, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { SideMenuContentComponent } from "./side-menu-content/side-menu-content.component";
import { SideMenuItemComponent } from './side-menu-reports/side-menu-item.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  imports: [SideMenuContentComponent, SideMenuItemComponent]
})

export class SideMenuComponent {
  moduloService = inject(ModuleService)
}
