import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApi } from '../categories.api';
import { categoriesActions } from './categories.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import {
  selectCategoriesPage,
  selectCategoriesPageSize,
} from './categories.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoriesEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(CategoriesApi);
  private readonly store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        categoriesActions.loadRequested,
        categoriesActions.pageChanged,
        categoriesActions.pageSizeChanged
      ),
      withLatestFrom(
        this.store.select(selectCategoriesPage),
        this.store.select(selectCategoriesPageSize)
      ),
      switchMap(([, page, pageSize]) =>
        this.api.getAll({ page, limit: pageSize }).pipe(
          map((res) =>
            categoriesActions.loadSucceeded({
              categories: res.categories,
              metadata: res.metadata,
            })
          ),
          catchError(() =>
            of(
              categoriesActions.loadFailed({
                error: 'Failed to load categories',
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.createRequested),
      switchMap(({ payload }) =>
        this.api.create(payload).pipe(
          map((category) => categoriesActions.createSucceeded({ category })),
          catchError(() =>
            of(
              categoriesActions.createFailed({
                error: 'Failed to create category',
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.updateRequested),
      switchMap(({ id, payload }) =>
        this.api.update(id, payload).pipe(
          map((category) => categoriesActions.updateSucceeded({ category })),
          catchError(() =>
            of(
              categoriesActions.updateFailed({
                error: 'Failed to update category',
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.deleteRequested),
      switchMap(({ id }) =>
        this.api.remove(id).pipe(
          map((deletedId) =>
            categoriesActions.deleteSucceeded({ id: deletedId })
          ),
          catchError(() =>
            of(
              categoriesActions.deleteFailed({
                error: 'Failed to delete category',
              })
            )
          )
        )
      )
    )
  );

  reloadAfterMutation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        categoriesActions.createSucceeded,
        categoriesActions.updateSucceeded,
        categoriesActions.deleteSucceeded
      ),
      map(() => categoriesActions.loadRequested())
    )
  );
}
