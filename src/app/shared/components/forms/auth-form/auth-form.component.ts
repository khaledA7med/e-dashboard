import { Component, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig } from '../core/types/form.model';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from '../../../ui/components/otp-input/otp-input.component';

@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule, OtpInputComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) config!: DynamicFormConfig;

  // Each password field can be toggled independently by name
  private readonly passwordVisibility = signal<Record<string, boolean>>({});

  isPasswordVisible(fieldName: string): boolean {
    return !!this.passwordVisibility()[fieldName];
  }

  togglePassword(fieldName: string): void {
    this.passwordVisibility.update((current) => ({
      ...current,
      [fieldName]: !current[fieldName],
    }));
  }
}
