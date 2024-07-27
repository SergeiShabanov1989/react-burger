import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'ORDER_CONNECT'>(
  'ORDER_CONNECT'
);

export const wsDisconnect = createAction('ORDER_DISCONNECT');

export type TWsExternalActions = ReturnType<
  typeof wsConnect | typeof wsDisconnect
>;
