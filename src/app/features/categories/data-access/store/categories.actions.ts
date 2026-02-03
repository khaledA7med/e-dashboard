import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category, CategoriesMetadata } from '../categories.models';

export const categoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Load Requested': emptyProps(),
    'Load Succeeded': props<{
      categories: Category[];
      metadata: CategoriesMetadata;
    }>(),
    'Load Failed': props<{ error: string }>(),

    'Search Changed': props<{ search: string }>(),
    'Page Changed': props<{ page: number }>(),
    'Page Size Changed': props<{ pageSize: number }>(),

    'Create Requested': props<{ payload: FormData }>(),
    'Create Succeeded': props<{ category: Category }>(),
    'Create Failed': props<{ error: string }>(),

    'Update Requested': props<{ id: string; payload: FormData }>(),
    'Update Succeeded': props<{ category: Category }>(),
    'Update Failed': props<{ error: string }>(),

    'Delete Requested': props<{ id: string }>(),
    'Delete Succeeded': props<{ id: string }>(),
    'Delete Failed': props<{ error: string }>(),

    'Clear Error': emptyProps(),
  },
});
