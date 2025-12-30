import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';
import { AUTH_FEATURE_KEY } from './auth.feature';

export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthTokens = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectIsLoggedIn = createSelector(
  selectAuthTokens,
  (tokens) => !!tokens?.token
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state) => state.status
);

export const selectAuthLoading = createSelector(
  selectAuthStatus,
  (status) => status === 'loading'
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// Reset flow
export const selectResetEmail = createSelector(
  selectAuthState,
  (state) => state.resetEmail
);

export const selectOtpVerified = createSelector(
  selectAuthState,
  (state) => state.otpVerified
);
