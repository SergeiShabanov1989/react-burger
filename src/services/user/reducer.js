import { createSlice } from '@reduxjs/toolkit';
import { register, logout, login, updateUserProfile } from './actions';
import { refreshToken } from '../../components/utils/api';

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, () => {
        refreshToken();
      });
  },
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
