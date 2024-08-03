import {
  initialState,
  orderDetailsSlice,
  setIsModalOrderOpen,
} from './reducer';

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = orderDetailsSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('setIsModalOrderOpen', () => {
    const action = {
      type: setIsModalOrderOpen.type,
      payload: true,
    };
    const state = orderDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      IsModalOpen: true,
    });
  });
});
