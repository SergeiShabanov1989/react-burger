import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../components/utils/api';

export const register = createAsyncThunk(
  'user/registerUser',
  async (formValue) => {
    return await registerUser(formValue);
  }
);
