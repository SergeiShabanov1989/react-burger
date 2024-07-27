import { createAction } from '@reduxjs/toolkit';

export const wsProfileConnect = createAction<string, 'ORDER_PROFILE_CONNECT'>(
  'ORDER_PROFILE_CONNECT'
);

export const wsProfileDisconnect = createAction('ORDER_PROFILE_DISCONNECT');

export type TWsProfileExternalActions = ReturnType<
  typeof wsProfileConnect | typeof wsProfileDisconnect
>;
