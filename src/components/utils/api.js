import { BASE_URL } from './constants';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsFromServer = async () => {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
};

export const sendOrderToServer = async (order) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  }).then(checkResponse);
};
