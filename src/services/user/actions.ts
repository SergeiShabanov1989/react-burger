import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked, setIsLoading } from './reducer';
import {
  registerUser,
  logoutUser,
  loginUser,
  getUser,
  updateUser,
  refreshToken,
} from '../../components/utils/api';
import {
  TRegisterUser,
  TLoginUser,
  TUpdateUser,
  TResponse,
} from '../../components/utils/types';

export const register = createAsyncThunk(
  'user/registerUser',
  async (formValue: TRegisterUser) => {
    return await registerUser(formValue);
  }
);

export const login = createAsyncThunk(
  'user/loginUser',
  async (formValue: TLoginUser) => {
    return await loginUser(formValue);
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('token')) {
      return getUser()
        .then((data) => {
            return dispatch(setUser(data));
        })
        .catch((err) => {
          if (!err.success) {
            dispatch(setIsLoading(true));
            refreshToken().then(() => {
              getUser().then((data) => {
                dispatch(setUser(data));
                dispatch(setIsLoading(false));
              });
            });
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
  async (formValue: TUpdateUser, { dispatch }) => {
    await updateUser(formValue)
      .then((data) => {
          dispatch(setUser(data));
      })
      .catch((err) => {
        if (!err.success) {
          dispatch(setIsLoading(true));
          refreshToken().then(() => {
            updateUser(formValue).then((data) => {
              dispatch(setUser(data));
              dispatch(setIsLoading(false));
            });
          });
        }
      });
    return updateUser(formValue);
  }
);

export const logout = createAsyncThunk('user/logoutUser', async () => {
  return await logoutUser();
});
