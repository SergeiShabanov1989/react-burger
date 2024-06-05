import { combineReducers } from '@reduxjs/toolkit';
import { getIngredientsSlice } from './burger-ingredients/reducer';
import { viewableIngredientSlice } from './viewable-ingredient/reducer';
import { orderDetailsSlice } from './order-details/reducer';
import { constructorIngredientsSlice } from './constructor-ingredients/reducer';

export const reducer = combineReducers({
  [getIngredientsSlice.reducerPath]: getIngredientsSlice.reducer,
  [viewableIngredientSlice.reducerPath]: viewableIngredientSlice.reducer,
  [orderDetailsSlice.reducerPath]: orderDetailsSlice.reducer,
  [constructorIngredientsSlice.reducerPath]:
    constructorIngredientsSlice.reducer,
});
