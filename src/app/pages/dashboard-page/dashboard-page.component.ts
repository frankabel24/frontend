import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuReportsComponent } from "../../components/side-menu/side-menu-reports/side-menu-reports.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.components";
import { DirectoryCarpetsComponent } from "../../components/directory-carpets/directory-carpets.component";
import { DetailsPageComponent } from "../details-page/details-page.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [SideMenuComponent, DirectoryCarpetsComponent, DetailsPageComponent, HeaderComponent],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {
  reportsOpen = false;
}
