import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../components/utils/types';

export type TViewableOrderState = {
  viewableOrder: TOrder | null;
  IsModalOpen: boolean;
};

const initialState: TViewableOrderState = {
  viewableOrder: null,
  IsModalOpen: false,
};

export const viewableOrderSlice = createSlice({
  name: 'viewableOrder',
  initialState,
  reducers: {
    setViewableOrder: (state, action: PayloadAction<TOrder>) => {
      state.viewableOrder = action.payload;
    },
    setIsModalOrderOpen: (state, action: PayloadAction<boolean>) => {
      state.IsModalOpen = action.payload;
    },
  },
  selectors: {
    getViewableOrder: (state) => state.viewableOrder,
    getIsModalOpen: (state) => state.IsModalOpen,
  },
});

export const { setIsModalOrderOpen, setViewableOrder } =
viewableOrderSlice.actions;

export const { getViewableOrder, getIsModalOpen } = viewableOrderSlice.selectors;

export type TViewableOrderActions = ReturnType<
  (typeof viewableOrderSlice.actions)[keyof typeof viewableOrderSlice.actions]
>;
