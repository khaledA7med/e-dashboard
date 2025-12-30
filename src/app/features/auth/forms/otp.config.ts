import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../shared/components/forms/core/types/form.model';

export const OTP_FORM_CONFIG: DynamicFormConfig = {
  fields: [
    {
      name: 'code',
      type: 'otp',
      otpLength: 6,
      validators: [Validators.required, Validators.pattern(/^\d{6}$/)],
    },
  ],
};
