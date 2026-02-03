import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { CATEGORIES_FEATURE_KEY } from './data-access/store/categories.selectors';
import { categoriesReducer } from './data-access/store/categories.reducer';
import { CategoriesEffects } from './data-access/store/categories.effects';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(CATEGORIES_FEATURE_KEY, categoriesReducer),
      provideEffects(CategoriesEffects),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/categories-list/categories-list.component').then(
            (c) => c.CategoriesListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./ui/categories-form/categories-form.component').then(
            (c) => c.CategoriesFormComponent
          ),
        data: { mode: 'create' },
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./ui/categories-form/categories-form.component').then(
            (c) => c.CategoriesFormComponent
          ),
        data: { mode: 'edit' },
      },
    ],
  },
];
