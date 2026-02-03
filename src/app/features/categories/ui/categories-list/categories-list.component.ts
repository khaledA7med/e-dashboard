import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesFacade } from '../../facade/categories.facade';
import {
  DynamicListColumn,
  DynamicListAction,
} from '../../../../shared/models/dynamic-list/dynamic-list.model';
import { Category } from '../../data-access/categories.models';
import { DynaimcListComponent } from '../../../../shared/components/dynaimc-list/dynaimc-list.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [DynaimcListComponent],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent {
  private readonly facade = inject(CategoriesFacade);
  private readonly router = inject(Router);

  readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  readonly items = toSignal(this.facade.items$, { initialValue: [] });
  readonly page = toSignal(this.facade.page$, { initialValue: 1 });
  readonly totalPages = toSignal(this.facade.totalPages$, { initialValue: 1 });

  columns: DynamicListColumn<Category>[] = [
    { key: 'name', label: 'Name', className: 'font-medium' },
    {
      key: 'productsCount',
      label: 'Products',
      formatter: (row) => `${row.productsCount} products`,
    },
  ];

  actions: DynamicListAction<Category>[] = [
    {
      label: 'Edit',
      color: 'primary',
      onClick: (row) => this.router.navigate(['/categories', row._id, 'edit']),
    },
    {
      label: 'Delete',
      color: 'danger',
      onClick: (row) => this.facade.delete(row._id),
    },
  ];

  constructor() {
    this.facade.ensureLoaded();
  }

  onSearch(value: string) {
    this.facade.search(value);
  }

  onPageChange(page: number) {
    this.facade.setPage(page);
  }

  goCreate() {
    this.router.navigate(['/categories/new']);
  }
}
