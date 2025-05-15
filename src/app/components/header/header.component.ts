import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  id_item = input.required<{ id: number, tipo: 'carpeta' | 'reporte' }>()
  moduloService = inject(ModuleService);

  onClick() {
    this.moduloService.obtenerElemento(this.id_item());
    console.log('Se realizo la llamada al service');
  }
}
