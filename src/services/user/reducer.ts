import { createSlice } from '@reduxjs/toolkit';
import { register, logout, login } from './actions';
import { TUser } from '../../components/utils/types';

export type TUserState = {
  user?: TUser | null;
  isAuthChecked: boolean;
  isEmailChecked: boolean;
  isError: boolean;
  isLoading: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isEmailChecked: false,
  isError: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setIsEmailChecked: (state, action) => {
      state.isEmailChecked = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsEmailChecked: (state) => state.isEmailChecked,
    getIsError: (state) => state.isError,
    getIsLoading: (state) => state.isLoading,
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
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isError = true;
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
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isError = true;
      });
  },
});

export const {
  setUser,
  setIsAuthChecked,
  setIsEmailChecked,
  setIsLoading,
  setIsError,
} = userSlice.actions;
export const {
  getUser,
  getIsAuthChecked,
  getIsEmailChecked,
  getIsError,
  getIsLoading,
} = userSlice.selectors;


export type TUserActions = ReturnType<
  (typeof userSlice.actions)[keyof typeof userSlice.actions]
>;
