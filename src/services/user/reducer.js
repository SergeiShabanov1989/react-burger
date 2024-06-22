import { createSlice } from '@reduxjs/toolkit';
import { register, logout, login } from './actions';

const initialState = {
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
      state.user = action.payload.user;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setIsEmailChecked: (state, action) => {
      state.isEmailChecked = action.payload;
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
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isError = true;
      });
  },
});

export const { setUser, setIsAuthChecked, setIsEmailChecked, setIsLoading } =
  userSlice.actions;
export const {
  getUser,
  getIsAuthChecked,
  getIsEmailChecked,
  getIsError,
  getIsLoading,
} = userSlice.selectors;
