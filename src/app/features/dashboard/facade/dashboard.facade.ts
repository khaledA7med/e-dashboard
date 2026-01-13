import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { dashboardActions } from '../data-access/store/dashboard.actions';
import {
  selectCategoriesStats,
  selectDailyRevenue,
  selectDashboardError,
  selectDashboardLoading,
  selectLowStockProducts,
  selectMonthlyRevenue,
  selectOrdersByStatus,
  selectOverallStats,
  selectTopSellingProducts,
  selectDashboardStats,
} from '../data-access/store/dashboard.selectors';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly store = inject(Store);

  // ====== state (read-only) ======
  readonly loading$: Observable<boolean> = this.store.select(
    selectDashboardLoading
  );
  readonly error$: Observable<string | null> =
    this.store.select(selectDashboardError);

  readonly overall$ = this.store.select(selectOverallStats);
  readonly ordersByStatus$ = this.store.select(selectOrdersByStatus);
  readonly monthlyRevenue$ = this.store.select(selectMonthlyRevenue);
  readonly dailyRevenue$ = this.store.select(selectDailyRevenue);

  readonly topSelling$ = this.store.select(selectTopSellingProducts);
  readonly lowStock$ = this.store.select(selectLowStockProducts);
  readonly categories$ = this.store.select(selectCategoriesStats);

  // used to prevent reloading if already loaded
  readonly stats$ = this.store.select(selectDashboardStats);

  // ====== commands ======
  load(): void {
    this.store.dispatch(dashboardActions.loadRequested());
  }

  /** Load only if state has no statistics yet */
  ensureLoaded(): void {
    this.stats$.pipe(take(1)).subscribe((stats) => {
      if (!stats) this.load();
    });
  }

  refresh(): void {
    this.load();
  }
}
