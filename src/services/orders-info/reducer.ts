import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../components/utils/types';

export type TOrderInfo = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  connectionError: string | null;
};

export const initialState: TOrderInfo = {
  orders: [],
  total: null,
  totalToday: null,
  connectionError: null,
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    wsMessage: (state, action: PayloadAction<TOrderInfo>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
  },
  selectors: {
    getOrders: (state) => state.orders,
    getConnectionError: (state) => state.connectionError,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
  },
});

export const { wsMessage, wsError } = orderInfoSlice.actions;
export const { getOrders, getConnectionError, getTotal, getTotalToday } = orderInfoSlice.selectors;

export type TOrderInfoActions = ReturnType<
  (typeof orderInfoSlice.actions)[keyof typeof orderInfoSlice.actions]
>;
