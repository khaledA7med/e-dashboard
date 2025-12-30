import { Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../../../shared/components/forms/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../../facade';
import { DynamicFormService } from '../../../../shared/components/forms/core/types/dynamic-form.service';
import { FORGOT_PASSWORD_FORM_CONFIG } from '../../forms/forgot-password.config';
import { FormGroup } from '@angular/forms';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, AuthFormComponent, AuthLayoutComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly auth = inject(AuthFacade);
  private readonly formService = inject(DynamicFormService);

  submitted = signal(false);

  loading$ = this.auth.loading$;
  error$ = this.auth.error$;

  readonly config = FORGOT_PASSWORD_FORM_CONFIG;
  readonly form: FormGroup = this.formService.buildForm(this.config);

  submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const email = String(this.form.get('email')?.value);
    this.auth.forgotPassword(email);
  }
}
