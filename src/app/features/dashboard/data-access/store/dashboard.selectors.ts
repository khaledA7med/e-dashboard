import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import { normalizeOrderStatus, normalizeQuantity } from './dashboard.helpers';
import { DASHBOARD_FEATURE_KEY } from './dashboard.features';

export const selectDashboardState = createFeatureSelector<DashboardState>(
  DASHBOARD_FEATURE_KEY
);

/* =======================
 * BASIC
 * ======================= */

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectDashboardStats = createSelector(
  selectDashboardState,
  (state) => state.statistics
);

/* =======================
 * KPIs
 * ======================= */

export const selectOverallStats = createSelector(
  selectDashboardStats,
  (stats) => stats?.overall ?? null
);

/* =======================
 * ORDERS
 * ======================= */

export const selectOrdersByStatus = createSelector(
  selectDashboardStats,
  (stats) =>
    stats?.orders.ordersByStatus.map((o) => ({
      status: normalizeOrderStatus(o._id),
      count: o.count,
    })) ?? []
);

/* =======================
 * REVENUE
 * ======================= */

export const selectMonthlyRevenue = createSelector(
  selectDashboardStats,
  (stats) =>
    stats?.orders.monthlyRevenue.map((p) => ({
      date: p._id,
      revenue: p.revenue,
      count: p.count,
    })) ?? []
);

export const selectDailyRevenue = createSelector(
  selectDashboardStats,
  (stats) =>
    stats?.orders.dailyRevenue.map((p) => ({
      date: p._id,
      revenue: p.revenue,
      count: p.count,
    })) ?? []
);

/* =======================
 * PRODUCTS
 * ======================= */

export const selectTopSellingProducts = createSelector(
  selectDashboardStats,
  (stats) => stats?.products.topSellingProducts ?? []
);

export const selectLowStockProducts = createSelector(
  selectDashboardStats,
  (stats) =>
    stats?.products.lowStockProducts.map((p) => ({
      ...p,
      quantity: normalizeQuantity(p.quantity),
    })) ?? []
);

/* =======================
 * CATEGORIES
 * ======================= */

export const selectCategoriesStats = createSelector(
  selectDashboardStats,
  (stats) => stats?.categories ?? []
);
