import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrderToServer } from "../../components/utils/api";


export const sendOrder = createAsyncThunk(
  "constructorIngredients/sendOrder",
  async (order, thunkAPI) => {
    try {
      return await sendOrderToServer(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)