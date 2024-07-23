import { createSlice } from '@reduxjs/toolkit';

export type TOrderDetailsState = {
  IsModalOpen: boolean;
};

const initialState: TOrderDetailsState = {
  IsModalOpen: false,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setIsModalOrderOpen(state, action) {
      state.IsModalOpen = action.payload;
    },
  },
});

export const { setIsModalOrderOpen } = orderDetailsSlice.actions;
