import { Routes } from "@angular/router";
import CuantitativoPageComponent from "./cuantitativo-component/cuantitativo-page.component";
import { NuevoReporteCuantitativoComponent } from "./nuevo-reporte-cuantitativo/nuevo-reporte-cuantitativo.component";
import { ModificarReporteCuantitativoComponent } from "./modificar-reporte-cuantitativo/modificar-reporte-cuantitativo.component";
import { MostrarReporteCuantitativoComponent } from "./mostrar-reporte-cuantitativo/mostrar-reporte-cuantitativo.component";


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
        path: 'modificar-reporte-cuantitativo/:id',
        title: 'Modificar Reporte de tipo cuantitativo',
        component: ModificarReporteCuantitativoComponent,
      },
      {
        path: 'mostrar-reporte-cuantitativo/:id',
        title: 'Mostrar Reporte de tipo cuantitativo',
        component: MostrarReporteCuantitativoComponent,
      },
      {
        path: '**',
        redirectTo: 'Cuantitativo'
      }
    ]
  }
]
