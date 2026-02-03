import { createReducer, on } from '@ngrx/store';
import { Category, CategoriesMetadata } from '../categories.models';
import { categoriesActions } from './categories.actions';

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  search: string;

  // server pagination
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export const initialCategoriesState: CategoriesState = {
  items: [],
  loading: false,
  loaded: false,
  error: null,

  search: '',

  page: 1,
  pageSize: 10,
  totalPages: 1,
  totalItems: 0,
};

export const categoriesReducer = createReducer(
  initialCategoriesState,

  on(categoriesActions.loadRequested, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // ✅ store categories + metadata
  on(categoriesActions.loadSucceeded, (state, { categories, metadata }) => ({
    ...state,
    items: categories ?? [],
    loading: false,
    loaded: true,

    page: metadata?.currentPage ?? state.page,
    pageSize: metadata?.limit ?? state.pageSize,
    totalPages: metadata?.totalPages ?? 1,
    totalItems: metadata?.totalItems ?? 0,
  })),

  on(categoriesActions.loadFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(categoriesActions.searchChanged, (state, { search }) => ({
    ...state,
    search,
  })),

  on(categoriesActions.pageChanged, (state, { page }) => ({
    ...state,
    loading: true,
    page,
  })),

  on(categoriesActions.pageSizeChanged, (state, { pageSize }) => ({
    ...state,
    loading: true,
    pageSize,
    page: 1,
  })),

  on(categoriesActions.createSucceeded, (state) => ({
    ...state,
    page: 1,
    loaded: false,
  })),

  on(categoriesActions.updateSucceeded, (state) => ({
    ...state,
    loaded: false,
  })),

  on(categoriesActions.deleteSucceeded, (state) => ({
    ...state,
    loaded: false,
  })),

  on(
    categoriesActions.createFailed,
    categoriesActions.updateFailed,
    categoriesActions.deleteFailed,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),

  on(categoriesActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
