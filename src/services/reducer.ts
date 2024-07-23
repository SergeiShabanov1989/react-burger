import { combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { getIngredientsSlice } from './burger-ingredients/reducer';
import { viewableIngredientSlice } from './viewable-ingredient/reducer';
import { orderDetailsSlice } from './order-details/reducer';
import { constructorIngredientsSlice } from './constructor-ingredients/reducer';
import { userSlice } from './user/reducer';

export const reducer = combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [getIngredientsSlice.reducerPath]: getIngredientsSlice.reducer,
  [viewableIngredientSlice.reducerPath]: viewableIngredientSlice.reducer,
  [orderDetailsSlice.reducerPath]: orderDetailsSlice.reducer,
  [constructorIngredientsSlice.reducerPath]:
    constructorIngredientsSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();