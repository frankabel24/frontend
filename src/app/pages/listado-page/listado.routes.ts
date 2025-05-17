import { Routes } from "@angular/router";
import ListadoPageComponent from "./listado-component/listado-page.component";
import { NuevoReporteListadoComponent } from "./nuevo-reporte-listado/nuevo-reporte-listado.component";
import { ModificarReporteListadoComponent } from "./modificar-reporte-listado/modificar-reporte-listado.component";
import { MostrarReporteListadoComponent } from "./mostrar-reporte-listado/mostrar-reporte-listado.component";

export const listadoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Listado',
        title: 'Reportes de tipo Listado',
        component: ListadoPageComponent,
      },
      {
        path: 'nuevo-reporte-listado',
        title: 'Crear Reporte de tipo Listado',
        component: NuevoReporteListadoComponent,
      },
      {
        path: 'modificar-reporte-listado/:id',
        title: 'Modificar Reporte de tipo Listado',
        component: ModificarReporteListadoComponent,
      },
      {
        path: 'mostrar-reporte-listado/:id',
        title: 'Mostrar Reporte de tipo Listado',
        component: MostrarReporteListadoComponent,
      },
      {
        path: '**',
        redirectTo: 'Listado'
      }
    ]
  }
]
