import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';

const initialState = {
  ingredients: [],
  loading: false,
  error: false,
};

export const getIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
