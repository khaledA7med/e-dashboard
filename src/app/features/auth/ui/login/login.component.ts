import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '../../facade';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../../../shared/components/forms/auth-form/auth-form.component';
import { DynamicFormService } from '../../../../shared/components/forms/core/types/dynamic-form.service';
import { LOGIN_FORM_CONFIG } from '../../forms/login.config';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFormComponent,
    AuthLayoutComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly formService = inject(DynamicFormService);

  submitted = signal(false);

  loading$ = this.auth.loading$;
  error$ = this.auth.error$;

  readonly config = LOGIN_FORM_CONFIG;
  readonly form: FormGroup = this.formService.buildForm(this.config);

  readonly invalid = computed(() => this.form.invalid && this.submitted());

  submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const email = String(this.form.get('email')?.value ?? '');
    const password = String(this.form.get('password')?.value ?? '');

    this.auth.login(email, password);
  }

  goToForgot(): void {
    this.router.navigate(['/auth/forgot-password']);
  }
}
