import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { DASHBOARD_FEATURE_KEY } from './data-access/store/dashboard.features';
import { dashboardReducer } from './data-access/store/dashboard.reducer';
import { DashboardEffects } from './data-access/store/dashboard.effects';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(DASHBOARD_FEATURE_KEY, dashboardReducer),
      provideEffects(DashboardEffects),
    ],
    children: [
      /** Overview */
      {
        path: 'overview',
        loadComponent: () =>
          import('./ui/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
        data: { breadcrumb: 'Overview' },
      },

      /** Categories */
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.routes').then(
            (m) => m.CATEGORIES_ROUTES
          ),
        data: { breadcrumb: 'Categories' },
      },
    ],
  },
];
