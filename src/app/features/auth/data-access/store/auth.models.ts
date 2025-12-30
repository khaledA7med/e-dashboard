// src/app/features/auth/data-access/store/auth.models.ts

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: unknown[];
  addresses: unknown[];
  createdAt: string;
}

export interface AuthTokens {
  token: string;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AuthError {
  message: string;
}

export interface AuthState {
  // session
  user: AuthUser | null;
  token: AuthTokens | null;

  // async state
  status: AuthStatus;
  error: AuthError | null;

  // reset-password flow state
  resetEmail: string | null;
  otpVerified: boolean;
}
