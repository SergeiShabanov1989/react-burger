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
  key: number;
}

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TUser = {
  email: string;
  name: string;
}

export type TToken = {
  accessToken: string;
}

export type TRefreshToken = {
  refreshToken: string;
}

export type TResponse = {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

export type TResponseBody = {
  method: string;
  headers?: HeadersInit;
  body?: string;
}

export type TResetPassword = {
  password: string;
  token: string;
}

export type TResetEmail = {
  email: string;
}

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
}

export type TUpdateUser = {
  name?: string;
  email?: string;
  password?: string;
}

export type TLoginUser = {
  email: string;
  password: string;
}