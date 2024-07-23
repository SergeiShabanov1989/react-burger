import { createSelector } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../components/utils/types';
import { RootState } from '../reducer';

export const ingredientsPriceSelector = createSelector(
  (state: RootState) => state.constructorIngredients,
  (constructorIngredients) => {
    let sum = 0;
    if (
      constructorIngredients.buns != null &&
      constructorIngredients.constructorIngredients.length !== 0
    ) {
      sum = constructorIngredients.constructorIngredients.reduce(
        (acc: number, number: TConstructorIngredient) => acc + number.price,
        constructorIngredients.buns.price * 2
      );
    }
    return sum;
  }
);
