import { initialState, orderSlice, setOrder } from './reducer';

const order = {
  _id: '123',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = orderSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('setOrder', () => {
    const action = {
      type: setOrder.type,
      payload: order,
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: order[0],
    });
  });
});
