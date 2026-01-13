import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../../facade/dashboard.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { KpiCardsComponent } from '../components/kpi-cards/kpi-cards.component';
import { CategorySummaryComponent } from '../components/category-summary/category-summary.component';
import { OrdersStatusComponent } from '../components/orders-status/orders-status.component';
import { RevenueChartComponent } from '../components/revenue-chart/revenue-chart.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { SkeletonsComponent } from '../components/skeletons/skeletons.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardsComponent,
    CategorySummaryComponent,
    OrdersStatusComponent,
    RevenueChartComponent,
    ProductListComponent,
    SkeletonsComponent,
  ],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  private readonly facade = inject(DashboardFacade);

  ngOnInit(): void {
    // ensure dashboard data is loaded once
    this.facade.ensureLoaded();
  }

  /* =======================
   * STORE → SIGNALS
   * ======================= */

  readonly loading = toSignal(this.facade.loading$, {
    initialValue: false,
  });

  readonly error = toSignal(this.facade.error$, {
    initialValue: null,
  });

  readonly overall = toSignal(this.facade.overall$, {
    initialValue: null,
  });

  readonly ordersByStatus = toSignal(this.facade.ordersByStatus$, {
    initialValue: [],
  });

  readonly monthlyRevenue = toSignal(this.facade.monthlyRevenue$, {
    initialValue: [],
  });

  readonly dailyRevenue = toSignal(this.facade.dailyRevenue$, {
    initialValue: [],
  });

  readonly topSelling = toSignal(this.facade.topSelling$, {
    initialValue: [],
  });

  readonly lowStock = toSignal(this.facade.lowStock$, {
    initialValue: [],
  });

  readonly categories = toSignal(this.facade.categories$, {
    initialValue: [],
  });
}
