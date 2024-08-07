import { initialState, orderProfileInfoSlice, wsProfileMessage, wsProfileError } from './reducer';

const order = {
  _id: '123',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = orderProfileInfoSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('wsProfileMessage', () => {
    const action = {
      type: wsProfileMessage.type,
      payload: { orders: [order, order], total: 0, totalToday: 0 },
    };
    const state = orderProfileInfoSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [order, order],
      total: 0,
      totalToday: 0,
    });
  });

  it('wsProfileError', () => {
    const action = {
      type: wsProfileError.type,
      payload: { message: 'error' },
    };
    const state = orderProfileInfoSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connectionError: { message: 'error' },
    });
  });
});
