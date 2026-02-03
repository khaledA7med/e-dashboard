import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicFormConfig } from '../core/types/form.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../core/types/field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-form.component.html',
  styleUrl: './dashboard-form.component.scss',
})
export class DashboardFormComponent implements OnInit {
  @Input() config!: DynamicFormConfig;
  @Output() submitForm = new EventEmitter<any>();
  imagePreviews: Record<string, string | null> = {};

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.buildForm();

    for (const field of this.config.fields) {
      if (field.type === 'file' && field.previewUrl) {
        this.imagePreviews[field.name] = field.previewUrl;
      }
    }
  }

  private buildForm(): FormGroup {
    const controls: Record<string, any> = {};

    for (const field of this.config.fields) {
      controls[field.name] = [null, field.validators ?? []];
    }

    return this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    if (this.config.submitType === 'form-data') {
      const fd = new FormData();

      for (const field of this.config.fields) {
        const value = raw[field.name];

        if (value === null || value === undefined) continue;

        if (field.type === 'file') {
          fd.append(field.name, value);
        } else {
          fd.append(field.name, String(value));
        }
      }

      this.submitForm.emit(fd);
      return;
    }

    // default JSON
    this.submitForm.emit(raw);
  }

  isInvalid(field: FormField): boolean {
    const control = this.form.get(field.name);
    return !!(control && control.touched && control.invalid);
  }

  onFileChange(event: Event, field: FormField) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (field.maxSizeMB && file.size > field.maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${field.maxSizeMB}MB`);
      return;
    }

    this.form.patchValue({ [field.name]: file });
    this.form.get(field.name)?.markAsDirty();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[field.name] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
