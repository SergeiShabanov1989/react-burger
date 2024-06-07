import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';

const initialState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

export const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
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
        state.ingredients = action.payload.data;
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
