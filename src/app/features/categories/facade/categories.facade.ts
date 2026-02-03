import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoriesActions } from '../data-access/store/categories.actions';
import {
  selectCategoriesError,
  selectCategoriesLoading,
  selectCategoriesPage,
  selectCategoriesSearch,
  selectCategoriesLoaded,
  selectCategoriesTotalPages,
  selectCategoriesItems,
  selectFilteredCategories,
} from '../data-access/store/categories.selectors';
import { take } from 'rxjs';
import { CategoriesApi } from '../data-access/categories.api';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  private readonly store = inject(Store);
  private readonly api = inject(CategoriesApi);

  readonly loading$ = this.store.select(selectCategoriesLoading);
  readonly error$ = this.store.select(selectCategoriesError);

  readonly search$ = this.store.select(selectCategoriesSearch);
  readonly items$ = this.store.select(selectFilteredCategories);
  readonly totalPages$ = this.store.select(selectCategoriesTotalPages);
  readonly page$ = this.store.select(selectCategoriesPage);
  readonly loaded$ = this.store.select(selectCategoriesLoaded);

  load() {
    this.store.dispatch(categoriesActions.loadRequested());
  }

  ensureLoaded(): void {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (!loaded) this.load();
    });
  }

  getById(id: string) {
    return this.api.getById(id);
  }
  search(value: string) {
    this.store.dispatch(categoriesActions.searchChanged({ search: value }));
  }

  setPage(page: number) {
    this.store.dispatch(categoriesActions.pageChanged({ page }));
    this.store.dispatch(categoriesActions.loadRequested());
  }

  setPageSize(pageSize: number) {
    this.store.dispatch(categoriesActions.pageSizeChanged({ pageSize }));
  }

  create(payload: FormData) {
    this.store.dispatch(categoriesActions.createRequested({ payload }));
  }

  update(id: string, payload: FormData) {
    this.store.dispatch(categoriesActions.updateRequested({ id, payload }));
  }

  delete(id: string) {
    this.store.dispatch(categoriesActions.deleteRequested({ id }));
  }
}
