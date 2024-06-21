import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked } from './reducer';
import {
  registerUser,
  logoutUser,
  loginUser,
  getUser,
  updateUser,
  refreshToken,
} from '../../components/utils/api';

export const register = createAsyncThunk(
  'user/registerUser',
  async (formValue) => {
    return await registerUser(formValue);
  }
);

export const login = createAsyncThunk('user/loginUser', async (formValue) => {
  return await loginUser(formValue);
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('token')) {
      getUser()
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((err) => {
          if (!err.success) {
            return refreshToken();
          }
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

export const logout = createAsyncThunk('user/logoutUser', async () => {
  return await logoutUser();
});
