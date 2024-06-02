import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsFromServer } from "../../components/utils/api";


export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, thunkAPI) => {
    try {
      return await getIngredientsFromServer();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)