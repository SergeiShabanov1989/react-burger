import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../components/utils/types';

export type TViewableIngredientState = {
  viewableIngredient: TIngredient | null;
  IsModalOpen: boolean;
};

const initialState: TViewableIngredientState = {
  viewableIngredient: null,
  IsModalOpen: false,
};

export const viewableIngredientSlice = createSlice({
  name: 'viewableIngredient',
  initialState,
  reducers: {
    setViewableIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.viewableIngredient = action.payload;
    },
    setIsModalIngredientOpen: (state, action: PayloadAction<boolean>) => {
      state.IsModalOpen = action.payload;
    },
  },
});

export const { setViewableIngredient, setIsModalIngredientOpen } =
  viewableIngredientSlice.actions;

export type TViewableIngredientActions = ReturnType<
  (typeof viewableIngredientSlice.actions)[keyof typeof viewableIngredientSlice.actions]
>;
