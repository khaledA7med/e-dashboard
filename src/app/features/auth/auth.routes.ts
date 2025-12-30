import { provideState } from '@ngrx/store';
import { AuthFacade } from './facade';
import { AUTH_FEATURE_KEY } from './data-access/store/auth.feature';
import { authReducer } from './data-access/store/auth.reducer';
import { AuthEffects } from './data-access/store/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { AuthApi } from './data-access/auth.api';
import { otpGuard } from '../../core/guards/otp.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [
      AuthApi,
      provideState(AUTH_FEATURE_KEY, authReducer),
      provideEffects(AuthEffects),
    ],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./ui/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./ui/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'otp',
        canActivate: [otpGuard],
        loadComponent: () =>
          import('./ui/otp/otp.component').then((c) => c.OtpComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./ui/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
      },
    ],
  },
];
