import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../../../../shared/components/forms/core/types/form.model';

export const CATEGORY_FORM_CONFIG: DynamicFormConfig = {
  title: 'Add Category',
  submitLabel: 'Add Category',
  submitType: 'form-data',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter category name',
      validators: [Validators.required],
    },
    {
      name: 'image',
      label: 'Category image',
      type: 'file',
      validators: [Validators.required],
      accept: 'image/*',
      maxSizeMB: 5,
    },
  ],
};
