import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
