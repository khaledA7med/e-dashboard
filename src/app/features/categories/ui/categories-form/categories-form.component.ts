import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CategoriesFacade } from '../../facade/categories.facade';
import { CommonModule } from '@angular/common';
import { DashboardFormComponent } from '../../../../shared/components/forms/dashboard-form/dashboard-form.component';
import { CATEGORY_FORM_CONFIG } from './config/categories-form.config';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, DashboardFormComponent],
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  private readonly facade = inject(CategoriesFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.id;

  config = {
    ...CATEGORY_FORM_CONFIG,
    title: this.isEdit ? 'Edit Category' : 'Add Category',
    submitLabel: this.isEdit ? 'Update Category' : 'Create Category',
  };

  ngOnInit(): void {
    if (this.isEdit) {
      this.facade.getById(this.id!).subscribe((category) => {
        this.config.fields = this.config.fields.map((f) => ({
          ...f,
          defaultValue: (category as any)[f.name],
          previewUrl: f.name === 'image' ? category.image : undefined,
        }));
      });
    }
  }

  onSubmit(payload: FormData) {
    if (this.isEdit) {
      this.facade.update(this.id!, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/dashboard/categories']);
  }
}
