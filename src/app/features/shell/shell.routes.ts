import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './ui/shell-layout/shell-layout.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    data: { breadcrumb: 'Dashboard' }, // ✅ ROOT breadcrumb
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('../dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
    ],
  },
];
