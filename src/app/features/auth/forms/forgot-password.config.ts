import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../shared/components/forms/core/types/form.model';

export const FORGOT_PASSWORD_FORM_CONFIG: DynamicFormConfig = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'user@example.com',
      validators: [Validators.required, Validators.email],
    },
  ],
};
