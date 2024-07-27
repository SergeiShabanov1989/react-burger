import { createSlice } from '@reduxjs/toolkit';
import { orderFromServer } from './actions';
import { TOrder } from '../../components/utils/types';

export type TOrderState = {
  order: TOrder | null;
};

export const initialState: TOrderState = {
  order: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload[0];
    },
  },
  selectors: {
    getOrder: (state) => state.order,
  },
});
export const { getOrder } = orderSlice.selectors;

export const { setOrder } = orderSlice.actions;

export type TOrderActions = ReturnType<
  (typeof orderSlice.actions)[keyof typeof orderSlice.actions]
>;
