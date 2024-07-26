import {
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { getIngredientsSlice } from './burger-ingredients/reducer';
import { viewableIngredientSlice } from './viewable-ingredient/reducer';
import { orderDetailsSlice } from './order-details/reducer';
import { constructorIngredientsSlice } from './constructor-ingredients/reducer';
import { userSlice } from './user/reducer';
import { orderInfoSlice } from './orders-info/reducer';
import { viewableOrderSlice } from './viewable-order/reducer';
import { TViewableIngredientActions } from './viewable-ingredient/reducer';
import { TUserActions } from './user/reducer';
import { TOrderDetailsActions } from './order-details/reducer';
import { TConstructorIngredientsActions } from './constructor-ingredients/reducer';
import { TOrderInfoActions } from './orders-info/reducer';
import { TViewableOrderActions } from './viewable-order/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsError, wsMessage } from './orders-info/reducer';
import { wsConnect, TWsExternalActions } from './orders-info/actions';

const orderMiddleware = socketMiddleware({
  connect: wsConnect,
  onError: wsError,
  onMessage: wsMessage,
});

export const reducer = combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [getIngredientsSlice.reducerPath]: getIngredientsSlice.reducer,
  [viewableIngredientSlice.reducerPath]: viewableIngredientSlice.reducer,
  [orderDetailsSlice.reducerPath]: orderDetailsSlice.reducer,
  [constructorIngredientsSlice.reducerPath]:
    constructorIngredientsSlice.reducer,
  [orderInfoSlice.reducerPath]: orderInfoSlice.reducer,
  [viewableOrderSlice.reducerPath]: viewableOrderSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderMiddleware);
  },
});

type TApplicationActions =
  | TViewableIngredientActions
  | TUserActions
  | TOrderDetailsActions
  | TConstructorIngredientsActions
  | TOrderInfoActions
  | TWsExternalActions
  | TViewableOrderActions;

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
