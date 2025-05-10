import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'Listado',
    loadComponent: () => import('./pages/listado-page/listado-page.component'),
  },
  {
    path: 'Cruzado',
    loadComponent: () => import('./pages/cruzado-page/cruzado-page.component'),
  },
  {
    path: 'Cuantitativo',
    loadComponent: () => import('./pages/cuantitativo-page/cuantitativo-page.component'),
  },
  {
    path: '**',
    redirectTo: 'Listado'
  }
];
