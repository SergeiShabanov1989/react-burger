import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderToServer } from '../../components/utils/api';

export const sendOrder = createAsyncThunk(
  'constructorIngredients/sendOrder',
  async (order) => {
    return await sendOrderToServer(order);
  }
);
