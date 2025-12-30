import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormConfig } from './form.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  buildForm(config: DynamicFormConfig): FormGroup {
    const controls: Record<string, any> = {};

    for (const field of config.fields) {
      controls[field.name] = [
        field.defaultValue ?? null,
        field.validators ?? [],
      ];
    }

    return this.fb.group(controls);
  }
}
