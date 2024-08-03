import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../components/utils/types';

export type TOrderProfileInfo = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  connectionError: string | null;
};

export const initialState: TOrderProfileInfo = {
  orders: [],
  total: null,
  totalToday: null,
  connectionError: null,
};

export const orderProfileInfoSlice = createSlice({
  name: 'orderProfileInfo',
  initialState,
  reducers: {
    wsProfileMessage: (state, action: PayloadAction<TOrderProfileInfo>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsProfileError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
  },
  selectors: {
    getProfileOrders: (state) => state.orders,
    getConnectionError: (state) => state.connectionError,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
  },
});

export const { wsProfileMessage, wsProfileError } =
  orderProfileInfoSlice.actions;
export const { getProfileOrders, getConnectionError, getTotal, getTotalToday } =
  orderProfileInfoSlice.selectors;

export type TOrderProfileInfoActions = ReturnType<
  (typeof orderProfileInfoSlice.actions)[keyof typeof orderProfileInfoSlice.actions]
>;
