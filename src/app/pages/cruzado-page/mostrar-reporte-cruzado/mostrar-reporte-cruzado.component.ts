import { Component, inject, signal } from '@angular/core';
import { ModuleService } from '../../../services/module.service';
import { Reporte } from '../../../interfaces/reporte.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-mostrar-reporte-cruzado',
  imports: [],
  templateUrl: './mostrar-reporte-cruzado.component.html',
})
export class MostrarReporteCruzadoComponent {
  activatedRoute = inject(ActivatedRoute);
  moduloService = inject(ModuleService);
  reporte = signal<Reporte>({} as Reporte);
  camposSeleccionados = signal<string[]>([]);
  router = inject(Router);

  Facultades = [
    'FTL',
    'FCIBER',
    'FIO',
    'FTI',
    'FTE',
    'CITEC'
  ]

  Generos = [
    'Femenino',
    'Masculino'
  ]

  reporteId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  ngOnInit() {
    this.cargarReporte();
  }

  cargarReporte() {
    const id = this.reporteId();
    this.moduloService.obtenerReporteById(id).subscribe({
      next: (reporte) => {
        this.reporte.set(reporte);
        // Procesamos los campos seleccionados cuando recibimos el reporte
        this.camposSeleccionados.set(
          reporte.campos_seleccionados.split(',')
            .map(campo => campo.trim())
        );
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
      }
    });
  }

  onCancel() {
    this.router.navigate([`/dashboard-${this.moduloService.getType()}`])
  }
}
