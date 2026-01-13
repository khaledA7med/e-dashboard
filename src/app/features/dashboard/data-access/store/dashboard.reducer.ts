import { createReducer, on } from '@ngrx/store';
import { DashboardStatistics } from '../dashboard.models';
import { dashboardActions } from './dashboard.actions';

export interface DashboardState {
  statistics: DashboardStatistics | null;
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  statistics: null,
  loading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialDashboardState,

  on(dashboardActions.loadRequested, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(dashboardActions.loadSucceeded, (state, { statistics }) => ({
    ...state,
    statistics,
    loading: false,
  })),

  on(dashboardActions.loadFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
