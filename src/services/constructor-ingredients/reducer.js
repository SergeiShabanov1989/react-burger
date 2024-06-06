import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sendOrder } from './actions';

const initialState = {
  buns: null,
  constructorIngredients: [],
  order: null,
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  selectors: {
    getAllIngredients: (state) => state.order,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.constructorIngredients = [];
        state.buns = null;
        state.order = action.payload;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.constructorIngredients = [];
        state.buns = null;
      });
  },
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
    moveIngredient: {
      reducer: (state, action) => {
        state.constructorIngredients = action.payload;
      },
    },
  },
});

export const { setConstructorIngredients, deleteIngredients, moveIngredient } =
  constructorIngredientsSlice.actions;
