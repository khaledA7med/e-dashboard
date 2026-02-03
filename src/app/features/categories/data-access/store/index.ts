import { categoriesReducer } from './categories.reducer';
import { CategoriesEffects } from './categories.effects';
import { CATEGORIES_FEATURE_KEY } from './categories.selectors';

export const CATEGORIES_FEATURE = {
  name: CATEGORIES_FEATURE_KEY,
  reducer: categoriesReducer,
  effects: [CategoriesEffects],
};
