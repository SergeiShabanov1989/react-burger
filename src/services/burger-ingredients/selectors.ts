import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

export const bunSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'bun');
  }
);

export const mainSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'main');
  }
);

export const sauceSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'sauce');
  }
);
