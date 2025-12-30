// src/app/features/auth/facade/auth.facade.ts

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { authActions } from '../data-access/store/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsLoggedIn,
  selectResetEmail,
  selectOtpVerified,
} from '../data-access/store/auth.selectors';
import { AuthError, AuthUser } from '../data-access/store/auth.models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);


  /* =======================
   *  STATE (READ-ONLY)
   * ======================= */

  readonly user$: Observable<AuthUser | null> =
    this.store.select(selectAuthUser);

  readonly isLoggedIn$: Observable<boolean> =
    this.store.select(selectIsLoggedIn);

  readonly loading$: Observable<boolean> = this.store.select(selectAuthLoading);

  readonly error$: Observable<AuthError | null> =
    this.store.select(selectAuthError);

  readonly resetEmail$: Observable<string | null> =
    this.store.select(selectResetEmail);

  readonly otpVerified$: Observable<boolean> =
    this.store.select(selectOtpVerified);

  readonly isLoggedIn = toSignal(this.isLoggedIn$, {
    initialValue: false,
  });
  /* =======================
   *  COMMANDS (INTENTIONS)
   * ======================= */

  login(email: string, password: string): void {
    this.store.dispatch(authActions.loginRequested({ email, password }));
  }

  logout(): void {
    this.store.dispatch(authActions.logoutRequested());
  }

  forgotPassword(email: string): void {
    this.store.dispatch(authActions.forgotPasswordRequested({ email }));
  }

  verifyOtp(resetCode: string): void {
    this.store.dispatch(authActions.oTPVerificationRequested({ resetCode }));
  }

  resetPassword(email: string, newPassword: string): void {
    this.store.dispatch(
      authActions.resetPasswordRequested({ email, newPassword })
    );
  }

  clearError(): void {
    this.store.dispatch(authActions.clearError());
  }

  clearResetFlow(): void {
    this.store.dispatch(authActions.resetFlowCleared());
  }

  getResetEmailSnapshot(): string | null {
    let email: string | null = null;
    this.store
      .select(selectResetEmail)
      .subscribe((v) => (email = v))
      .unsubscribe();
    return email;
  }
}
