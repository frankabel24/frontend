import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentType } from '../../../interfaces/content-type.interface';

@Component({
  selector: 'app-side-menu-content',
  imports: [],
  templateUrl: './side-menu-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContentComponent {
  contents = input.required<ContentType[]>();
}
