import { Routes } from "@angular/router";
import ListadoPageComponent from "./listado-component/listado-page.component";
import { NuevoReporteListadoComponent } from "./nuevo-reporte-listado/nuevo-reporte-listado.component";
import { ModificarReporteListadoComponent } from "./modificar-reporte-listado/modificar-reporte-listado.component";
import { MostrarReporteListadoComponent } from "./mostrar-reporte-listado/mostrar-reporte-listado.component";
import { VerDetallesListadoComponent } from "./ver-detalles-listado/ver-detalles-listado.component";

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
        path: 'modificar-reporte-listado',
        title: 'Modificar Reporte de tipo Listado',
        component: ModificarReporteListadoComponent,
      },
      {
        path: 'mostrar-reporte-listado',
        title: 'Mostrar Reporte de tipo Listado',
        component: MostrarReporteListadoComponent,
      },
      {
        path: 'ver-detalles-reporte-listado',
        title: 'Ver Detalles de Reporte de tipo Listado',
        component: VerDetallesListadoComponent,
      },
      {
        path: '**',
        redirectTo: 'Listado'
      }
    ]
  }
]
