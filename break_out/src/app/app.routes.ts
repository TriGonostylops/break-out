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
  {
    path: 'map-selector',
    loadComponent: () => {
        return import('./pages/map-selector/map-selector.component').then((m) => m.MapSelectorComponent);
    },
  },
  {
    path: 'game/:id',
    loadComponent: () => {
        return import('./pages/game/game.component').then((m) => m.GameComponent);
    },
  },
];
