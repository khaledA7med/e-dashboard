import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './ui/shell-layout/shell-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    canActivateChild: [authGuard],
    data: { breadcrumb: 'Dashboard' },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
    ],
  },
];
