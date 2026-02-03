import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './categories.reducer';

export const CATEGORIES_FEATURE_KEY = 'categories';

export const selectCategoriesState = createFeatureSelector<CategoriesState>(
  CATEGORIES_FEATURE_KEY
);

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (s) => s.loading
);

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  (s) => s.loaded
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (s) => s.error
);

export const selectCategoriesSearch = createSelector(
  selectCategoriesState,
  (s) => s.search
);

export const selectCategoriesPage = createSelector(
  selectCategoriesState,
  (s) => s.page
);

export const selectCategoriesPageSize = createSelector(
  selectCategoriesState,
  (s) => s.pageSize
);

export const selectCategoriesTotalPages = createSelector(
  selectCategoriesState,
  (s) => s.totalPages
);

export const selectCategoriesTotalItems = createSelector(
  selectCategoriesState,
  (s) => s.totalItems
);

export const selectCategoriesItems = createSelector(
  selectCategoriesState,
  (s) => s.items
);

export const selectFilteredCategories = createSelector(
  selectCategoriesItems,
  selectCategoriesSearch,
  (items, search) => {
    if (!search) return items;

    const q = search.toLowerCase();
    return items.filter((c) => c.name.toLowerCase().includes(q));
  }
);
