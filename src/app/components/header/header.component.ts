import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from '../../services/module.service';
import { CreateFolderModalComponent } from '../create-folder-modal/create-folder-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModificarFolderModalComponent } from '../modificar-folder-modal/modificar-folder-modal.component';
import { Folder } from '../../interfaces/folder.interface';
import { ButtonComponent } from '../ui/button/button.component';


@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  id_item = input.required<{ id: number, tipo: 'carpeta' | 'reporte' }>()
  moduloService = inject(ModuleService);
  dialog = inject(MatDialog);
  router = inject(Router);
  carpeta = signal<Folder>({} as Folder);

  get tieneItem(): boolean {
    return this.id_item()!.id !== undefined;
  }

  onCreateCarpeta() {
    const item = this.id_item();
    if (!item) return;

    if (item.tipo === 'reporte') {
      this.moduloService.obtenerReporteById(item.id).subscribe({
        next: (resp) => {
          this.dialog.open(CreateFolderModalComponent, {
            width: '500px',
            panelClass: 'custom-dialog',
            data: { parentId: resp.id_padre }
          });
        },
        error: (error) => {
          console.error('Error al obtener el reporte:', error);
        }
      });
    } else if (item.id == 0) {
      this.dialog.open(CreateFolderModalComponent, {
        width: '500px',
        panelClass: 'custom-dialog',
        data: { parentId: null }
      });
    }
    else {
      this.dialog.open(CreateFolderModalComponent, {
        width: '500px',
        panelClass: 'custom-dialog',
        data: { parentId: item.id }
      });
    }
  }

  onClick() {

    this.moduloService.obtenerElemento(this.id_item());
  }

  onCrearReporte() {

    if (this.id_item().id == 0) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          titulo: 'No se puede crear el reporte',
          mensaje: 'Tiene que seleccionar una carpeta para crear el reporte',
          botonAceptar: 'Cerrar',
          botonCancelar: undefined
        }
      });
    } else {
      this.moduloService.obtenerElemento(this.id_item());
      this.router.navigate([`/dashboard-${this.moduloService.getType()}/nuevo-reporte-${this.moduloService.getType()}`]);
    }

  }

  onModificarReporte() {
    if (this.id_item().tipo !== 'reporte') {
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          titulo: 'No se puede modificar el reporte',
          mensaje: 'Tiene que seleccionar un reporte para poder modificarlo',
          botonAceptar: 'Cerrar',
          botonCancelar: undefined
        }
      });
    } else {
      this.moduloService.obtenerElemento(this.id_item());
      this.router.navigate([`/dashboard-${this.moduloService.getType()}/modificar-reporte-${this.moduloService.getType()}/${this.id_item().id}`]);
    }
  }

  onModificarCarpeta() {
    if (this.id_item().id == 0 || this.id_item().tipo === 'reporte') {
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          titulo: 'No se puede modificar la carpeta',
          mensaje: 'Tiene que seleccionar una carpeta para poder modificarla',
          botonAceptar: 'Cerrar',
          botonCancelar: undefined
        }
      });
    } else {
      this.moduloService.obtenerElemento(this.id_item());

      this.moduloService.obtenerCarpetaById(this.id_item().id).subscribe((resp) => {
        const dialogRef = this.dialog.open(ModificarFolderModalComponent, {
          data: resp
        });
      })


    }
  }
}
