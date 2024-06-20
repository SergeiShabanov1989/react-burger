import { BASE_URL } from './constants';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
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

export const sendOrderToServer = async (order) => {
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
    localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  });
};

export const loginUser = async (formValue) => {
  return request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  }).then((data) => {
    localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  });
};

export const getUser = async () => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + `${localStorage.getItem('token')}`,
    },
  }).catch((err) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw err;
  });
};

export const updateUser = async (formValue) => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formValue),
  });
};

export const registerUser = async (formValue) => {
  return request(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  }).then((data) => {
    localStorage.setItem('token', data.accessToken.split('Bearer')[1]);
    localStorage.setItem('refreshToken', data.refreshToken);
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

export const forgotPassword = async (formValue) => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};

export const resetPassword = async (formValue) => {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValue),
  });
};
