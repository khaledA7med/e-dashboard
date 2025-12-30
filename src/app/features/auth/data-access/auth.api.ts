import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from './auth.api.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);

  private readonly BASE_URL = 'https://flower.elevateegy.com/api/v1/auth';

  /**
   * Login
   * POST /auth/signin
   */
  signin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/signin`, payload);
  }

  /**
   * Logout
   * POST /auth/logout
   */
  logout(): Observable<void> {
    return this.http.get<void>(`${this.BASE_URL}/logout`);
  }

  /**
   * Forgot Password (request reset code)
   * POST /auth/forgotPassword
   */
  forgotPassword(
    payload: ForgotPasswordRequest
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.BASE_URL}/forgotPassword`,
      payload
    );
  }

  /**
   * Verify OTP (reset code)
   * POST /auth/verifyResetCode
   */
  verifyResetCode(payload: VerifyOtpRequest): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(
      `${this.BASE_URL}/verifyResetCode`,
      payload
    );
  }

  /**
   * Reset Password
   * POST /auth/resetPassword
   */
  resetPassword(
    payload: ResetPasswordRequest
  ): Observable<{ message: string; token: string }> {
    return this.http.put<{ message: string; token: string }>(
      `${this.BASE_URL}/resetPassword`,
      payload
    );
  }
}
