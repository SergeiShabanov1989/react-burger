import { BASE_URL } from './constants';
import {
  TIngredient,
  TOrder,
  TUser,
  TResponse,
  TResponseBody,
  TResetPassword,
  TResetEmail,
  TRegisterUser,
  TUpdateUser,
  TLoginUser,
  TOrderToServer,
} from './types';

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request<T>(url: string, options: TResponseBody): Promise<T> {
  return fetch(url, options).then(checkResponse<T>);
}

export const getIngredientsFromServer = async (): Promise<
  Array<TIngredient>
> => {
  return request<TResponse>(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    if (data && data.data) {
      return data.data;
    }

    return [];
  });
};

export const sendOrderToServer = async (
  order: TOrderToServer
): Promise<TOrder> => {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
};

export const refreshToken = async (): Promise<
  Pick<TResponse, 'accessToken' | 'refreshToken'>
> => {
  return request<Pick<TResponse, 'accessToken' | 'refreshToken'>>(
    `${BASE_URL}/auth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }
  ).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    return data;
  });
};

export const loginUser = async (
  formValue: TLoginUser
): Promise<Pick<TResponse, 'accessToken' | 'refreshToken' | 'user'>> => {
  return request<Pick<TResponse, 'accessToken' | 'refreshToken'>>(
    `${BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    }
  ).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  });
};

export const getUser = async (): Promise<TUser> => {
  return request<TResponse>(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${localStorage.getItem('token')}`,
    },
  }).then((data) => {
    if (data && data.user) {
      return data.user;
    }
    return {} as TUser;
  });
};

export const updateUser = async (formValue: TUpdateUser): Promise<TUser> => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formValue),
  });
};

export const registerUser = async (
  formValue: TRegisterUser
): Promise<Pick<TResponse, 'accessToken' | 'refreshToken' | 'user'>> => {
  return request<Pick<TResponse, 'accessToken' | 'refreshToken'>>(
    `${BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    }
  ).then((data) => {
    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  });
};

export const logoutUser = async (): Promise<TResponse> => {
  return request<TResponse>(`${BASE_URL}/auth/logout`, {
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

export const forgotPassword = async (
  formValue: TResetEmail
): Promise<TResponse> => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};

export const resetPassword = async (
  formValue: TResetPassword
): Promise<TResponse> => {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};
