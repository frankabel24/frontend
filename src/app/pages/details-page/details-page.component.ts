import { ChangeDetectionStrategy, Component, effect, inject, input, model, signal } from '@angular/core';
import { Folder } from '../../interfaces/folder.interface';
import { Reporte } from '../../interfaces/reporte.interface';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Item } from '../../interfaces/item.interface';
import { catchError, of } from 'rxjs';
import { CreateFolderModalComponent } from '../../components/create-folder-modal/create-folder-modal.component';
import { ModificarFolderModalComponent } from '../../components/modificar-folder-modal/modificar-folder-modal.component';

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

      if (currentItem?.id !== 0) {
        this.obtenerDatos();
      }

    });
  }

  obtenerDatos() {
    if (this.item()!.tipo === 'carpeta') {
      this.moduloService.obtenerCarpetaById(this.item()!.id).subscribe((resp) => {
        this.carpeta.set(resp);
        this.reporte.set({} as Reporte);

      })
    } else {
      this.moduloService.obtenerReporteById(this.item()!.id).subscribe((resp) => {
        this.reporte.set(resp);
        this.carpeta.set({} as Folder);

      })
    }

  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateFolderModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog',
      data: {
        parentId: this.carpeta().id
      }
    });
  }

  onEditarCarpeta(): void {
    const dialogRef = this.dialog.open(ModificarFolderModalComponent, {
      data: this.carpeta()
    });
  }

  onDeleteCarpeta(id: number) {
    // Primero verificamos el contenido de la carpeta
    this.moduloService.obtenerContenidoByCarpeta(id)
      .pipe(
        catchError(error => {
          console.error('Error al verificar contenido de la carpeta:', error);
          return of({ carpetas_hija: [], reportes: [] });
        })
      )
      .subscribe({
        next: (contenido) => {
          // Preparamos el mensaje según el contenido
          const tieneContenido = contenido.carpetas_hija.length > 0 || contenido.reportes.length > 0;

          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              titulo: 'Eliminar Carpeta',
              mensaje: tieneContenido
                ? 'Esta carpeta contiene elementos. No se puede eliminar hasta que esté vacía.'
                : '¿Está seguro que desea eliminar esta carpeta?',
              botonAceptar: tieneContenido ? 'Cerrar' : 'Eliminar',
              botonCancelar: tieneContenido ? undefined : 'Cancelar'  // Usamos undefined en lugar de string vacío
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            // Solo procesamos la eliminación si no hay contenido y el usuario confirmó
            if (result === true && !tieneContenido) {
              this.moduloService.deleteCarpeta(id).subscribe({
                next: (response) => {
                  console.log('[DEBUG] Carpeta eliminada:');
                  window.location.reload();
                },
                error: (error) => {
                  console.error('[ERROR] No se pudo eliminar la carpeta:', error);
                }
              });
            }
          });
        }
      });
  }


  onCrearReporte() {
    const item: Item = {
      id: this.carpeta().id,
      tipo: 'carpeta'
    }
    this.moduloService.obtenerElemento(item);
    this.router.navigate([`dashboard-${this.moduloService.getType()}/nuevo-reporte-${this.moduloService.getType()}`])
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
