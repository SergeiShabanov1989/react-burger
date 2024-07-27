export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key: string;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  order?: TOrder;
};

export type TOrderToServer = {
  ingredients: string[];
};

export type TUser = {
  success?: boolean;
  email: string;
  name: string;
};

export type TResponse = {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  data?: TIngredient[];
  user?: TUser;
  orders?: TOrder;
};

export type TResponseBody = {
  method: string;
  headers?: HeadersInit;
  body?: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TResetEmail = {
  email: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUser = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TOrders = {
  success?: boolean;
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
}