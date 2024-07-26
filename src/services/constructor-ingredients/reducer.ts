import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sendOrder } from './actions';
import { TConstructorIngredient, TOrder } from '../../components/utils/types';

export type TConstructorIngredientState = {
  buns: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
  order: TOrder | null;
};

export const initialState: TConstructorIngredientState = {
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
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
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
      prepare: (constructorIngredients: TConstructorIngredient) => {
        return {
          payload: { ...constructorIngredients, key: nanoid() },
          type: 'setConstructorIngredients',
        };
      },
    },
    deleteIngredients: {
      reducer: (state, action: PayloadAction<string>) => {
        state.constructorIngredients = state.constructorIngredients.filter(
          (ingredient: TConstructorIngredient) =>
            ingredient.key !== action.payload
        );
      },
      prepare: (payload: string) => ({ payload }),
    },
    moveIngredient: {
      reducer: (
        state,
        action: PayloadAction<Array<TConstructorIngredient>>
      ) => {
        state.constructorIngredients = action.payload;
      },
      prepare: (payload: Array<TConstructorIngredient>) => {
        return { payload };
      },
    },
  },
});

export const { setConstructorIngredients, deleteIngredients, moveIngredient } =
  constructorIngredientsSlice.actions;

export type TConstructorIngredientsActions = ReturnType<
  (typeof constructorIngredientsSlice.actions)[keyof typeof constructorIngredientsSlice.actions]
>;
