import { createSelector } from '@reduxjs/toolkit';

export const ingredientsPriceSelector = createSelector(
  (state) => state.constructorIngredients,
  (constructorIngredients) => {
    let sum = 0;
    if (constructorIngredients.buns != null && constructorIngredients.constructorIngredients.length !== 0) {
      sum = constructorIngredients.constructorIngredients.reduce((acc, number) => acc + number.price, constructorIngredients.buns.price * 2)
    }
    return sum;
  }
);