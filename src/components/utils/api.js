import { BASE_URL } from './constants';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}


export const getIngredientsFromServer = async () => {

  return request(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
};

export const sendOrderToServer = async (order) => {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
};
