import {
  initialState,
  viewableOrderSlice,
  setIsModalOrderOpen,
  setViewableOrder,
} from './reducer';

const order = {
  _id: '123',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = viewableOrderSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('setViewableOrder', () => {
    const action = {
      type: setViewableOrder.type,
      payload: order,
    };
    const state = viewableOrderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      viewableOrder: order,
    });
  });

  it('setIsModalOrderOpen', () => {
    const action = {
      type: setIsModalOrderOpen.type,
      payload: true,
    };
    const state = viewableOrderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      IsModalOpen: true,
    });
  });
});
