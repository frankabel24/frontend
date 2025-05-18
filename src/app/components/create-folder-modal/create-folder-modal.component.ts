import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleService } from '../../services/module.service';
import { FormUtils } from '../../utils/form-utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Folder } from '../../interfaces/folder.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-folder-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-folder-modal.component.html',
})
export class CreateFolderModalComponent {

  router = inject(Router);
  moduloService = inject(ModuleService);
  formUtils = FormUtils;
  parentId: number | null = null;
  dialogRef = inject(MatDialogRef<CreateFolderModalComponent>);
  snackBar = inject(MatSnackBar);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { parentId: number | null }
  ) {
    this.parentId = data.parentId;
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  onSubmit(): void {

    console.log(this.data.parentId)
    if (this.form.valid) {
      const folderData: Partial<Folder> = {
        nombre_carpeta: this.form.get('name')!.value ?? 'carpeta-por-defecto',
        propietario: 'Frank Abel',
        id_tipo_contenido: 1,
        id_padre: this.data.parentId
      };

      console.log(folderData);

      this.moduloService.createCarpeta(folderData).subscribe({
        next: () => {
          this.snackBar.open('Carpeta creada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          this.dialogRef.close();
          setTimeout(() => {
            window.location.reload();
          }, 0);
        },
        error: (error) => {
          this.snackBar.open('Error al crear la carpeta', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
