import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthError, AuthTokens, AuthUser } from './auth.models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    //login
    'Login Requested': props<{ email: string; password: string }>(),
    'Login Succeeded': props<{
      message: string;
      user: AuthUser;
      token: AuthTokens;
    }>(),
    'Login Failed': props<{ error: AuthError }>(),

    //Forgot Password
    'Forgot Password Requested': props<{ email: string }>(),
    'Forgot Password Succeeded': props<{
      email: string;
      message: string;
      info: string;
    }>(),
    'Forgot Password Failed': props<{ error: AuthError }>(),

    //OTP Verification
    'OTP Verification Requested': props<{ resetCode: string }>(),
    'OTP Verification Succeeded': props<{ status: string }>(),
    'OTP Verification Failed': props<{ error: AuthError }>(),

    //Reset Password
    'Reset Password Requested': props<{ email: string; newPassword: string }>(),
    'Reset Password Succeeded': props<{ message: string; token: AuthTokens }>(),
    'Reset Password Failed': props<{ error: AuthError }>(),

    //Logout
    'Logout Requested': emptyProps(),
    'Logout Completed': emptyProps(),

    // UTIL
    'Clear Error': emptyProps(),
    'Reset Flow Cleared': emptyProps(),
  },
});
