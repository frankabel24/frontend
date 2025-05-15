import { Routes } from "@angular/router";
import CruzadoPageComponent from "./cruzado-component/cruzado-page.component";
import { NuevoReporteCruzadoComponent } from "./nuevo-reporte-cruzado/nuevo-reporte-cruzado.component";
import { ModificarReporteCruzadoComponent } from "./modificar-reporte-cruzado/modificar-reporte-cruzado.component";
import { MostrarReporteCruzadoComponent } from "./mostrar-reporte-cruzado/mostrar-reporte-cruzado.component";
import { VerDetallesReporteCruzadoComponent } from "./ver-detalles-reporte-cruzado/ver-detalles-reporte-cruzado.component";

export const cruzadoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Cruzado',
        title: 'Reportes de tipo cruzado',
        component: CruzadoPageComponent,
      },
      {
        path: 'nuevo-reporte-cruzado',
        title: 'Crear Reporte de tipo cruzado',
        component: NuevoReporteCruzadoComponent,
      },
      {
        path: 'modificar-reporte-cruzado',
        title: 'Modificar Reporte de tipo cruzado',
        component: ModificarReporteCruzadoComponent,
      },
      {
        path: 'mostrar-reporte-cruzado',
        title: 'Mostrar Reporte de tipo cruzado',
        component: MostrarReporteCruzadoComponent,
      },
      {
        path: 'ver-detalles-reporte-cruzado',
        title: 'Ver Detalles de Reporte de tipo cruzado',
        component: VerDetallesReporteCruzadoComponent,
      },
      {
        path: '**',
        redirectTo: 'Cruzado'
      }
    ]
  }
]
