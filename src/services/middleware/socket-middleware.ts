import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../reducer';
import { refreshToken } from '../../components/utils/api';
import {wsProfileConnect, wsProfileDisconnect} from '../orders-profile-info/actions';
export type TWsActionTypes = {
  connect?: ActionCreatorWithPayload<string>;
  disconnect?: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<any>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
  withTokenRefresh?: boolean;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
  wsActions: TWsActionTypes,
  withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';
    let accessToken = localStorage.getItem('token');

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect?.match(action)) {
        url = action.payload;
        accessToken = localStorage.getItem('token');
        socket = new WebSocket(`${url}?token=${accessToken}`);
        isConnected = true;
        if (onConnecting) {
          dispatch(onConnecting());
        }

        socket.onopen = () => {
          if (onOpen) {
            dispatch(onOpen());
          }
        };

        socket.onerror = () => {
          dispatch(onError('Error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              parsedData.message === 'Invalid or missing token'
            ) {
              refreshToken()
                .then((refreshData) => {
                  if (refreshData && refreshData.accessToken) {
                    const wssUrl = new URL(url);
                    wssUrl.searchParams.set(
                      'token',
                      refreshData.accessToken.replace('Bearer ', '')
                    );
                    dispatch(wsProfileConnect(wssUrl.toString()));
                  } else {
                    dispatch(onError('Failed to refresh token'));
                  }
                })
                .catch((err) => {
                  dispatch(onError((err as { message: string }).message));
                });

              dispatch(wsProfileDisconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
          }
        };

        socket.onclose = () => {
          if (onClose) {
            dispatch(onClose());
          }

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as { message: string }).message));
        }
      }

      if (socket && disconnect?.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
