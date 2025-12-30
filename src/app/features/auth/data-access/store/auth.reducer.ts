import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.feature';
import { authActions } from './auth.actions';
import { AuthStatus } from './auth.models';

export const authReducer = createReducer(
  initialAuthState,

  //login
  on(authActions.loginRequested, (state) => ({
    ...state,
    status: 'loading' as AuthStatus,
    error: null,
  })),
  on(authActions.loginSucceeded, (state, { user, token }) => ({
    ...state,
    user,
    token,
    status: 'success' as AuthStatus,
    error: null,
  })),
  on(authActions.loginFailed, (state, { error }) => ({
    ...state,
    status: 'error' as AuthStatus,
    error,
  })),

  //forgot password
  on(authActions.forgotPasswordRequested, (state) => ({
    ...state,
    status: 'loading' as AuthStatus,
    error: null,
  })),
  on(authActions.forgotPasswordSucceeded, (state, { email }) => ({
    ...state,
    status: 'success' as AuthStatus,
    resetEmail: email,
    error: null,
  })),
  on(authActions.forgotPasswordFailed, (state, { error }) => ({
    ...state,
    status: 'error' as AuthStatus,
    error,
  })),

  //otp verification
  on(authActions.oTPVerificationRequested, (state) => ({
    ...state,
    status: 'loading' as AuthStatus,
    error: null,
  })),
  on(authActions.oTPVerificationSucceeded, (state) => ({
    ...state,
    otpVerified: true,
    status: 'success' as AuthStatus,
    error: null,
  })),
  on(authActions.oTPVerificationFailed, (state, { error }) => ({
    ...state,
    status: 'error' as AuthStatus,
    error,
  })),

  //reset password
  on(authActions.resetPasswordRequested, (state) => ({
    ...state,
    status: 'loading' as AuthStatus,
    error: null,
  })),
  on(authActions.resetPasswordSucceeded, (state) => ({
    ...state,
    token: state.token,
    otpVerified: false,
    status: 'success' as AuthStatus,
    resetEmail: null,
    error: null,
  })),
  on(authActions.resetPasswordFailed, (state, { error }) => ({
    ...state,
    status: 'error' as AuthStatus,
    error,
  })),

  //logout
  on(authActions.logoutCompleted, () => ({
    ...initialAuthState,
  })),

  // UTIL
  on(authActions.clearError, (state) => ({
    ...state,
    error: null,
    status: state.status === 'error' ? 'idle' : (state.status as AuthStatus),
  })),
  on(authActions.resetFlowCleared, (state) => ({
    ...state,
    resetEmail: null,
    otpVerified: false,
  }))
);
