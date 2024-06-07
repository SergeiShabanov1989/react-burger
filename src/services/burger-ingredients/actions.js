import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsFromServer } from '../../components/utils/api';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    return await getIngredientsFromServer();
  }
);
