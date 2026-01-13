import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DashboardStatistics } from '../dashboard.models';

export const dashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Requested': emptyProps(),
    'Load Succeeded': props<{ statistics: DashboardStatistics }>(),
    'Load Failed': props<{ error: string }>(),
  },
});
