// src/app/features/auth/data-access/store/auth.feature.ts
import { AuthState } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export const initialAuthState: AuthState = {
  user: null,
  token: null,

  status: 'idle',
  error: null,

  resetEmail: null,
  otpVerified: false,
};
