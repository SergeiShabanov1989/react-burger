import { getIngredients } from './actions';
import { initialState, getIngredientsSlice } from './reducer';

const ingredient = {
  _id: '1',
  name: 'Ингредиент 1',
  type: 'bun',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = getIngredientsSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('getIngredients fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [ingredient, ingredient],
    };
    const state = getIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [ingredient, ingredient],
    });
  });

  it('getIngredients pending', () => {
    const action = {
      type: getIngredients.pending.type,
    };
    const state = getIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('getIngredients rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      payload: true,
    };
    const state = getIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
    });
  });
});
