import { Component, computed, inject, signal } from '@angular/core';
import { AuthFacade } from '../../facade';
import { DynamicFormService } from '../../../../shared/components/forms/core/types/dynamic-form.service';
import { FormGroup } from '@angular/forms';
import { OTP_FORM_CONFIG } from '../../forms/otp.config';
import { AuthFormComponent } from '../../../../shared/components/forms/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [CommonModule, AuthFormComponent, RouterLink, AuthLayoutComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  private readonly auth = inject(AuthFacade);
  private readonly formService = inject(DynamicFormService);

  submitted = signal(false);
  // 🔒 cooldown (seconds)
  private readonly COOLDOWN = 600;
  countdown = signal(this.COOLDOWN);
  canResend = signal(false);

  // ✅ formatted mm:ss (e.g., 1:59)
  readonly countdownText = computed(() => {
    const total = Math.max(0, this.countdown());
    const mm = Math.floor(total / 60);
    const ss = total % 60;
    return `${mm}:${String(ss).padStart(2, '0')}`;
  });

  private timerId?: number;

  constructor() {
    this.startCooldown();
  }

  loading$ = this.auth.loading$;
  error$ = this.auth.error$;

  readonly email$ = this.auth.resetEmail$;
  readonly config = OTP_FORM_CONFIG;
  readonly form: FormGroup = this.formService.buildForm(OTP_FORM_CONFIG);

  submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const code = String(this.form.get('code')?.value);
    this.auth.verifyOtp(code);
  }

  resend(): void {
    const email = this.auth.getResetEmailSnapshot();
    if (!email || !this.canResend()) return;

    this.auth.forgotPassword(email);
    this.startCooldown();
  }

  private startCooldown(): void {
    this.canResend.set(false);

    // show 1:59 instantly
    this.countdown.set(this.COOLDOWN - 1);

    clearInterval(this.timerId);

    this.timerId = window.setInterval(() => {
      const next = this.countdown() - 1;
      this.countdown.set(next);

      if (next <= 0) {
        this.canResend.set(true);
        clearInterval(this.timerId);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
