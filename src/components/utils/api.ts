import { BASE_URL } from './constants';
import {
  TIngredient,
  TToken,
  TOrder,
  TUser,
  TResponse,
  TRefreshToken,
  TResponseBody,
  TResetPassword,
  TResetEmail,
  TRegisterUser,
  TUpdateUser,
  TLoginUser,
} from './types';

export const checkResponse = (res: Response): Promise<TResponse> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url: string, options: TResponseBody): Promise<TResponse> {
  return fetch(url, options).then(checkResponse);
}

export const getIngredientsFromServer = async () => {
  return request(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const sendOrderToServer = async (order: TOrder) => {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
};

export const refreshToken = async () => {
  return request(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    return data;
  });
};

export const loginUser = async (formValue: TLoginUser) => {
  return request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  }).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  });
};

export const getUser = async () => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${localStorage.getItem('token')}`,
    },
  });
};

export const updateUser = async (formValue: TUpdateUser) => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formValue),
  });
};

export const registerUser = async (formValue: TRegisterUser) => {
  return request(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  }).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  });
};

export const logoutUser = async () => {
  return request(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((data) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return data;
  });
};

export const forgotPassword = async (formValue: TResetEmail) => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};

export const resetPassword = async (formValue: TResetPassword) => {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};
