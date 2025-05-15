import { Routes } from "@angular/router";
import CuantitativoPageComponent from "./cuantitativo-component/cuantitativo-page.component";
import { NuevoReporteCuantitativoComponent } from "./nuevo-reporte-cuantitativo/nuevo-reporte-cuantitativo.component";
import { ModificarReporteCuantitativoComponent } from "./modificar-reporte-cuantitativo/modificar-reporte-cuantitativo.component";
import { MostrarReporteCuantitativoComponent } from "./mostrar-reporte-cuantitativo/mostrar-reporte-cuantitativo.component";
import { VerDetallesReporteCuantitativoComponent } from "./ver-detalles-reporte-cuantitativo/ver-detalles-reporte-cuantitativo.component";

export const cuantitativoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Cuantitativo',
        title: 'Reportes de tipo cuantitativo',
        component: CuantitativoPageComponent,
      },
      {
        path: 'nuevo-reporte-cuantitativo',
        title: 'Crear Reporte de tipo cuantitativo',
        component: NuevoReporteCuantitativoComponent,
      },
      {
        path: 'modificar-reporte-cuantitativo',
        title: 'Modificar Reporte de tipo cuantitativo',
        component: ModificarReporteCuantitativoComponent,
      },
      {
        path: 'mostrar-reporte-cuantitativo',
        title: 'Mostrar Reporte de tipo cuantitativo',
        component: MostrarReporteCuantitativoComponent,
      },
      {
        path: 'ver-detalles-reporte-cuantitativo',
        title: 'Ver Detalles de Reporte de tipo cuantitativo',
        component: VerDetallesReporteCuantitativoComponent,
      },
      {
        path: '**',
        redirectTo: 'Cuantitativo'
      }
    ]
  }
]
