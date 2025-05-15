import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registrar-carpeta',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './registrar-carpeta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrarCarpetaComponent {

  moduloService = inject(ModuleService);


}
