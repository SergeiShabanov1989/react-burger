import { initialState, orderInfoSlice, wsMessage, wsError } from './reducer';

const order = {
  _id: '123',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = orderInfoSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('wsMessage', () => {
    const action = {
      type: wsMessage.type,
      payload: { orders: [order, order], total: 0, totalToday: 0 },
    };
    const state = orderInfoSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [order, order],
      total: 0,
      totalToday: 0,
    });
  });

  it('wsError', () => {
    const action = {
      type: wsError.type,
      payload: { message: 'error' },
    };
    const state = orderInfoSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connectionError: { message: 'error' },
    });
  });
});
