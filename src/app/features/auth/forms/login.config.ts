import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../shared/components/forms/core/types/form.model';

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const LOGIN_FORM_CONFIG: DynamicFormConfig = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'user@example.com',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Ex: Admin@123',
      validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
    },
  ],
};
