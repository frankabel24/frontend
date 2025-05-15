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
    path: 'registrar-carpeta',
    loadComponent: () => import('./pages/registrar-carpeta/registrar-carpeta.component'),
  },
  {
    path: 'modificar-carpeta',
    loadComponent: () => import('./pages/modificar-carpeta/modificar-carpeta.component'),
  },
  {
    path: '**',
    redirectTo: 'dashboard-listado'
  }
];
