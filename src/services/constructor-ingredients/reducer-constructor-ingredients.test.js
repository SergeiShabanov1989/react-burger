import { sendOrder } from './actions';
import {
  initialState,
  constructorIngredientsSlice,
  setConstructorIngredients,
  deleteIngredients,
  moveIngredient,
} from './reducer';

const ingredient = {
  _id: '1',
};

const constructorIngredient = {
  ...ingredient,
  key: '1',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = constructorIngredientsSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('sendOrder fulfilled', () => {
    const action = {
      type: sendOrder.fulfilled.type,
      payload: [ingredient, ingredient],
    };
    const state = constructorIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: [ingredient, ingredient],
    });
  });

  it('sendOrder pending', () => {
    const action = {
      type: sendOrder.pending.type,
    };
    const state = constructorIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('sendOrder rejected', () => {
    const action = {
      type: sendOrder.rejected.type,
      payload: true,
    };
    const state = constructorIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
    });
  });

  it('setConstructorIngredients', () => {
    const action = {
      type: setConstructorIngredients.type,
      payload: [constructorIngredient, constructorIngredient],
    };
    const state = constructorIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      constructorIngredients: [[constructorIngredient, constructorIngredient]],
    });
  });

  it('deleteIngredients', () => {
    const previousState = {
      ...initialState,
      constructorIngredients: [constructorIngredient],
    };
    const action = {
      type: deleteIngredients.type,
      payload: constructorIngredient._id,
    };
    const state = constructorIngredientsSlice.reducer(previousState, action);
    expect(state).toEqual(initialState);
  });

  it('moveIngredient', () => {
    const action = {
      type: moveIngredient.type,
      payload: [constructorIngredient, constructorIngredient],
    };
    const state = constructorIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      constructorIngredients: [constructorIngredient, constructorIngredient],
    });
  });
});
