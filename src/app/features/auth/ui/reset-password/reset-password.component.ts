import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { AuthFacade } from '../../facade';
import { AuthFormComponent } from '../../../../shared/components/forms/auth-form/auth-form.component';
import { DynamicFormService } from '../../../../shared/components/forms/core/types/dynamic-form.service';
import { RESET_PASSWORD_FORM_CONFIG } from '../../forms/reset-password.config';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, AuthFormComponent, AuthLayoutComponent],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private readonly auth = inject(AuthFacade);
  private readonly formService = inject(DynamicFormService);

  readonly form: FormGroup = this.formService.buildForm(
    RESET_PASSWORD_FORM_CONFIG
  );

  readonly config = RESET_PASSWORD_FORM_CONFIG;
  readonly loading$ = this.auth.loading$;
  readonly error$ = this.auth.error$;

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const password = String(this.form.get('password')?.value);
    const confirmPassword = String(this.form.get('confirmPassword')?.value);

    if (password !== confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

    const email = this.auth.getResetEmailSnapshot();
    if (!email) return;

    this.auth.resetPassword(email, password);
  }
}
