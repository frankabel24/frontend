import { Routes } from "@angular/router";
import CruzadoPageComponent from "./cruzado-component/cruzado-page.component";
import { NuevoReporteCruzadoComponent } from "./nuevo-reporte-cruzado/nuevo-reporte-cruzado.component";
import { ModificarReporteCruzadoComponent } from "./modificar-reporte-cruzado/modificar-reporte-cruzado.component";
import { MostrarReporteCruzadoComponent } from "./mostrar-reporte-cruzado/mostrar-reporte-cruzado.component";


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
        path: '**',
        redirectTo: 'Cruzado'
      }
    ]
  }
]
