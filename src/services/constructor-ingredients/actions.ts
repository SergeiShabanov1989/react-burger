import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderToServer } from '../../components/utils/api';
import { TOrderToServer } from '../../components/utils/types';

export const sendOrder = createAsyncThunk(
  'constructorIngredients/sendOrder',
  async (order: TOrderToServer) => {
    return await sendOrderToServer(order);
  }
);
