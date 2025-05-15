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
    path: 'registrar-carpeta',
    loadComponent: () => import('./pages/registrar-carpeta/registrar-carpeta.component'),
  },
  {
    path: 'modificar-carpeta',
    loadComponent: () => import('./pages/modificar-carpeta/modificar-carpeta.component'),
  },
  {
    path: 'nuevo-informe',
    loadComponent: () => import('./pages/nuevo-informe/nuevo-informe.component'),
  },
  {
    path: '**',
    redirectTo: 'Listado'
  }
];
