import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'LIVE_TABLE_CONNECT'>(
  'LIVE_TABLE_CONNECT'
);

export type TWsExternalActions = ReturnType<typeof wsConnect>;
