import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SideMenuItemComponent } from "../side-menu-reports/side-menu-item.component";
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-side-menu-content',
  imports: [],
  templateUrl: './side-menu-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContentComponent {
  moduloService = inject(ModuleService);
}
