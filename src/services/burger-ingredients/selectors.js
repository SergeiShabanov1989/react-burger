import { createSelector } from '@reduxjs/toolkit';

export const bunSelector = createSelector(
  (state) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'bun');
  }
);

export const mainSelector = createSelector(
  (state) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'main');
  }
);

export const sauceSelector = createSelector(
  (state) => state.ingredients.ingredients,
  (ingredients) => {
    return ingredients.filter((ingredient) => ingredient.type === 'sauce');
  }
);
