import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { TIngredient } from '../../components/utils/types';

export type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  isError: boolean;
};

export const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

export const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: (state) => state.ingredients,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { getAllIngredients } = getIngredientsSlice.selectors;
