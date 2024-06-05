import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  buns: null,
  constructorIngredients: [],
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    setConstructorIngredients: {
      reducer: (state, action) => {
        if (action.payload.type !== 'bun') {
          state.constructorIngredients = [
            ...state.constructorIngredients,
            action.payload,
          ];
        }

        if (action.payload.type === 'bun') {
          state.buns = action.payload;
        }
      },
      prepare: (constructorIngredients) => {
        return { payload: { ...constructorIngredients, key: nanoid() } };
      },
    },
    deleteIngredients: {
      reducer: (state, action) => {
        state.constructorIngredients = state.constructorIngredients.filter(
          (ingredient) => ingredient.key !== action.payload
        );
      },
    },
  },
});

export const { setConstructorIngredients, deleteIngredients } =
  constructorIngredientsSlice.actions;
