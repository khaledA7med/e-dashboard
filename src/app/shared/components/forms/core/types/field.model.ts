import { ValidatorFn } from '@angular/forms';

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'otp'
  | 'textarea';

export interface FormField {
  name: string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  validators?: ValidatorFn[];
  options?: { label: string; value: any }[];
  defaultValue?: any;
  otpLength?: number;
}
