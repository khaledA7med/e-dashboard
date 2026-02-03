import { FormField } from './field.model';

export interface DynamicFormConfig {
  fields: FormField[];
  title?: string;
  submitLabel?: string;
  submitting?: boolean;
  submitType?: 'json' | 'form-data';
}
