import {
  initialState,
  viewableIngredientSlice,
  setViewableIngredient,
  setIsModalIngredientOpen,
} from './reducer';

const ingredient = {
  _id: '123',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = viewableIngredientSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('setViewableIngredient', () => {
    const action = {
      type: setViewableIngredient.type,
      payload: ingredient,
    };
    const state = viewableIngredientSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      viewableIngredient: ingredient,
    });
  });

  it('setIsModalIngredientOpen', () => {
    const action = {
      type: setIsModalIngredientOpen.type,
      payload: true,
    };
    const state = viewableIngredientSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      IsModalOpen: true,
    });
  });
});
