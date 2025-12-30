import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthApi } from '../auth.api';
import { AuthError } from './auth.models';
import { SessionService } from '../../../../core/services/session.service';
import { Router } from '@angular/router';
import { SweetToastService } from '../../../../core/ui/toast/sweet-toast.service';

const toAuthError = (err: any): AuthError => {
  return {
    message:
      err?.error?.error || // backend error response
      err?.message ||
      'An unknown error occurred',
  };
};
@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(AuthApi);
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);
  private toast = inject(SweetToastService);

  // Show error toast on any auth failure
  authErrorToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authActions.loginFailed,
          authActions.forgotPasswordFailed,
          authActions.oTPVerificationFailed,
          authActions.resetPasswordFailed
        ),
        tap(({ error }) => {
          this.toast.error(error.message);
        })
      ),
    { dispatch: false }
  );

  //Login effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      exhaustMap(({ email, password }) =>
        this.api.signin({ email, password }).pipe(
          map((res) =>
            authActions.loginSucceeded({
              user: {
                _id: res.user._id,
                firstName: res.user.firstName,
                lastName: res.user.lastName,
                email: res.user.email,
                gender: res.user.gender,
                phone: res.user.phone,
                photo: res.user.photo,
                role: res.user.role,
                wishlist: res.user.wishlist,
                addresses: res.user.addresses,
                createdAt: res.user.createdAt,
              },
              token: { token: res.token },
              message: res.message,
            })
          ),
          catchError((err) =>
            of(authActions.loginFailed({ error: toAuthError(err) }))
          )
        )
      )
    )
  );
  toastLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSucceeded),
        tap(() => this.toast.success('Welcome to admin dashboard!'))
      ),
    { dispatch: false }
  );

  // Logout effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutRequested),
      tap(() => {
        // fire API call but understand it must NOT block logout
        this.api.logout().subscribe({
          error: () => {},
        });
      }),
      map(() => authActions.logoutCompleted())
    )
  );
  toastLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logoutCompleted),
        tap(() => this.toast.success('Logged out successfully'))
      ),
    { dispatch: false }
  );

  // Forgot_password effect
  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.forgotPasswordRequested),
      exhaustMap(({ email }) =>
        this.api.forgotPassword({ email }).pipe(
          map(() =>
            authActions.forgotPasswordSucceeded({
              email,
              message: 'success',
              info: 'OTP sent to your email',
            })
          ),
          catchError((err) =>
            of(authActions.forgotPasswordFailed({ error: toAuthError(err) }))
          )
        )
      )
    )
  );
  toastForgotPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.forgotPasswordSucceeded),
        tap(() => this.toast.success('OTP sent to your email'))
      ),
    { dispatch: false }
  );

  // OTP_verification effect
  otpVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.oTPVerificationRequested),
      exhaustMap(({ resetCode }) =>
        this.api.verifyResetCode({ resetCode: resetCode }).pipe(
          map(() =>
            authActions.oTPVerificationSucceeded({ status: 'Success' })
          ),
          catchError((err) =>
            of(authActions.oTPVerificationFailed({ error: toAuthError(err) }))
          )
        )
      )
    )
  );
  toastOtpVerified$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.oTPVerificationSucceeded),
        tap(() => this.toast.success('OTP verified successfully'))
      ),
    { dispatch: false }
  );

  // Reset_password effect
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.resetPasswordRequested),
      exhaustMap(({ email, newPassword }) =>
        this.api.resetPassword({ email, newPassword }).pipe(
          map((res) =>
            authActions.resetPasswordSucceeded({
              message: res.message,
              token: { token: res.token },
            })
          ),
          catchError((err) =>
            of(authActions.resetPasswordFailed({ error: toAuthError(err) }))
          )
        )
      )
    )
  );
  toastResetPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.resetPasswordSucceeded),
        tap(() => this.toast.success('Password reset successfully'))
      ),
    { dispatch: false }
  );

  // Redirect to reset-password after success
  redirectAfterOtp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.oTPVerificationSucceeded),
        tap(() => {
          this.router.navigate(['/auth/reset-password']);
        })
      ),
    { dispatch: false }
  );

  // Redirect to OTP after success
  redirectAfterForgotPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.forgotPasswordSucceeded),
        tap(() => {
          this.router.navigate(['/auth/otp']);
        })
      ),
    { dispatch: false }
  );

  // Persist session on login success
  persistSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSucceeded),
        tap(({ user, token }) => {
          this.session.setSession({ user, token });
        })
      ),
    { dispatch: false }
  );

  // Redirect after successful login
  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSucceeded),
        tap(() => {
          this.router.navigate(['/overview']);
        })
      ),
    { dispatch: false }
  );

  // Clear session on logout
  clearSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logoutCompleted),
        tap(() => this.session.clearSession())
      ),
    { dispatch: false }
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logoutCompleted),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  // Persist session after reset password
  persistSessionAfterReset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.resetPasswordSucceeded),
        tap(({ token }) => {
          this.session.setSession({
            token,
            user: this.session.session()?.user ?? null,
          });
        })
      ),
    { dispatch: false }
  );

  // Redirect to dashboard after reset
  redirectAfterResetPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.resetPasswordSucceeded),
        tap(() => {
          this.router.navigate(['/overview']);
        })
      ),
    { dispatch: false }
  );
}
