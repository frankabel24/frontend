import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Folder } from '../../interfaces/folder.interface';
import { ModuleService } from '../../services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-modificar-folder-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-folder-modal.component.html',
})
export class ModificarFolderModalComponent {

  form = new FormGroup({
    nombre_carpeta: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  formUtils = FormUtils;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Folder,
    private dialogRef: MatDialogRef<ModificarFolderModalComponent>,
    private moduloService: ModuleService,
    private snackBar: MatSnackBar
  ) {
    this.loadCarpeta();
  }

  private loadCarpeta() {

    this.moduloService.obtenerCarpetaById

    this.form.patchValue({
      nombre_carpeta: this.data.nombre_carpeta,

    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedFolder: Folder = {
        ...this.data,
        nombre_carpeta: this.form.get('nombre_carpeta')!.value ?? 'nompre-pordefecto'
      };

      this.moduloService.updateCarpeta(this.data.id, updatedFolder).subscribe({
        next: () => {
          this.snackBar.open('Carpeta actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close();
          window.location.reload()
        },
        error: (error) => {
          this.snackBar.open('Error al actualizar la carpeta', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
