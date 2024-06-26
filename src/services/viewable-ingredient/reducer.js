import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewableIngredient: null,
  IsModalOpen: false,
};

export const viewableIngredientSlice = createSlice({
  name: 'viewableIngredient',
  initialState,
  reducers: {
    setViewableIngredient: (state, action) => {
      state.viewableIngredient = action.payload;
    },
    setIsModalIngredientOpen: (state, action) => {
      state.IsModalOpen = action.payload;
    },
  },
});

export const { setViewableIngredient, setIsModalIngredientOpen } =
  viewableIngredientSlice.actions;
