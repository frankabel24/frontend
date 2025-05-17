import { ChangeDetectionStrategy, Component, effect, inject, input, model, signal } from '@angular/core';
import { Folder } from '../../interfaces/folder.interface';
import { Reporte } from '../../interfaces/reporte.interface';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  item = input.required<{ id: number, tipo: 'carpeta' | 'reporte' } | null>();
  carpeta = signal<Folder>({} as Folder);
  reporte = signal<Reporte>({} as Reporte);
  moduloService = inject(ModuleService);
  router = inject(Router);
  dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      const currentItem = this.item();
      if (currentItem) {
        this.obtenerDatos();
      }
    });
  }

  obtenerDatos() {
    if (this.item()!.tipo === 'carpeta') {
      this.moduloService.obtenerCarpetaById(this.item()!.id).subscribe((resp) => {
        this.carpeta.set(resp);
        this.reporte.set({} as Reporte)
        console.log(resp);
      })
    } else {
      this.moduloService.obtenerReporteById(this.item()!.id).subscribe((resp) => {
        this.reporte.set(resp);
        this.carpeta.set({} as Folder)
        console.log(resp)
      })
    }

  }

  onMostrar() {
    const idReporte = this.reporte().id;

    const ruta = `dashboard-${this.moduloService.getType()}/mostrar-reporte-${this.moduloService.getType()}/${idReporte}`;
    console.log('[DEBUG] Intentando navegar a:', ruta);

    this.router.navigate([ruta]).then(
      () => console.log('[DEBUG] Navegación exitosa'),
      (error) => console.error('[ERROR] Fallo en la navegación:', error)
    );
  }

  onModificar() {
    const idReporte = this.reporte().id;

    const ruta = `dashboard-${this.moduloService.getType()}/modificar-reporte-${this.moduloService.getType()}/${idReporte}`;
    console.log('[DEBUG] Intentando navegar a:', ruta);

    this.router.navigate([ruta]).then(
      () => console.log('[DEBUG] Navegación exitosa'),
      (error) => console.error('[ERROR] Fallo en la navegación:', error)
    );

  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Reporte',
        mensaje: '¿Está seguro que desea eliminar este reporte?',
        botonAceptar: 'Eliminar',
        botonCancelar: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.moduloService.deleteReporte(id).subscribe({
          next: (response) => {
            console.log('[DEBUG] Reporte eliminado:');
            window.location.reload();
          },
          error: (error) => {
            console.error('[ERROR] No se pudo eliminar el reporte:', error);
          }
        });
      }
    });
  }
}
