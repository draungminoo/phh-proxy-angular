import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
        loadComponent: () =>
          import('./apps/welcome/welcome.component').then(
            (c) => c.WelcomeComponent,
          ),
      },
      {
        path: 'apps-list',
        loadComponent: () =>
          import('./apps/apps-list/apps-list.component').then(
            (c) => c.AppsListComponent,
          ),
      },
      {
        path: 'error-page',
        loadComponent: () =>
          import('./apps/error-page/error-page.component').then(
            (c) => c.ErrorPageComponent,
          ),
      },
    ],
  },
];
