import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../shared/components/forms/core/types/form.model';

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const RESET_PASSWORD_FORM_CONFIG: DynamicFormConfig = {
  fields: [
    {
      name: 'password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Example: Admin@123',
      validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Example: Admin@123',
      validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
    },
  ],
};
