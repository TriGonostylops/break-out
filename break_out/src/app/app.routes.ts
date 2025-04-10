import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'authenticate',
    loadComponent: () => {
        return import('./pages/authenticate/authenticate.component').then((m) => m.AuthenticateComponent);
    },
  },
];
