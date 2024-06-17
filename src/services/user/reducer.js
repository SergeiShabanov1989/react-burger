import { createSlice } from '@reduxjs/toolkit';
import { register } from './actions';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken.split('Bearer')[1]);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
