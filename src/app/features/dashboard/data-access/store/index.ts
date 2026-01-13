import { dashboardReducer } from './dashboard.reducer';
import { DashboardEffects } from './dashboard.effects';

export const DASHBOARD_FEATURE = {
  name: 'dashboard',
  reducer: dashboardReducer,
  effects: [DashboardEffects],
};
