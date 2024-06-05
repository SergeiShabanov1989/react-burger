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
        state.loading = true;
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { getAllIngredients } = getIngredientsSlice.selectors;
