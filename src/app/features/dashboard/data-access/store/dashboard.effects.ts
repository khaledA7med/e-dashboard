import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardApi } from '../dashboard.api';
import { dashboardActions } from './dashboard.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(DashboardApi);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.loadRequested),
      exhaustMap(() =>
        this.api.getAllStatistics().pipe(
          map((statistics) => dashboardActions.loadSucceeded({ statistics })),
          catchError(() =>
            of(
              dashboardActions.loadFailed({
                error: 'Failed to load dashboard data',
              })
            )
          )
        )
      )
    )
  );
}
