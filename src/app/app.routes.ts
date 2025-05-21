import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard-listado',
    loadChildren: () => import('./pages/listado-page/listado.routes').then(m => m.listadoRoutes),
  },
  {
    path: 'dashboard-cuantitativo',
    loadChildren: () => import('./pages/cuantitativo-page/cuantitativo.routes').then(m => m.cuantitativoRoutes),
  },
  {
    path: 'dashboard-cruzado',
    loadChildren: () => import('./pages/cruzado-page/cruzado.routes').then(m => m.cruzadoRoutes),
  },
  {
    path: 'tipos-contenido',
    loadComponent: () => import('./pages/tipos-contenido-nomenclador/tipos-contenido-nomenclador.component')
  },
  {
    path: 'tipos-reportes',
    loadComponent: () => import('./pages/tipos-reporte-nomenclador/tipos-reporte-nomenclador.component')
  },
  {
    path: '**',
    redirectTo: 'dashboard-listado'
  }
];
