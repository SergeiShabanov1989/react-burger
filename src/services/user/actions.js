import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked } from './reducer';
import { registerUser, logoutUser, loginUser, getUser, updateUser } from '../../components/utils/api';



export const register = createAsyncThunk(
  'user/registerUser',
  async (formValue) => {
    return await registerUser(formValue);
  }
);

export const login = createAsyncThunk(
  'user/loginUser',
  async (formValue) => {
    return await loginUser(formValue);
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('token')) {
      getUser()
        .then((user) => {
          dispatch(setUser(user));
        })
        .finally(() => {
          dispatch(setIsAuthChecked(true));
        });
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formValue) => {
    return await updateUser(formValue);
  }
);

export const logout = createAsyncThunk(
  'user/logoutUser',
  async (refreshToken) => {
    return await logoutUser(refreshToken);
  }
);
