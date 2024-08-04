import {
  initialState,
  userSlice,
  setUser,
  setIsAuthChecked,
  setIsEmailChecked,
  setIsLoading,
  setIsError,
} from './reducer';
import { register, logout, login } from './actions';

const user = {
  name: 'test',
  email: 'test',
};

describe('Redux store and actions', () => {
  it('initialize correctly', () => {
    const state = userSlice.reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('setUser', () => {
    const action = {
      type: setUser.type,
      payload: user,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: user,
    });
  });

  it('setIsAuthChecked', () => {
    const action = {
      type: setIsAuthChecked.type,
      payload: true,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('setIsEmailChecked', () => {
    const action = {
      type: setIsEmailChecked.type,
      payload: true,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isEmailChecked: true,
    });
  });

  it('setIsLoading', () => {
    const action = {
      type: setIsLoading.type,
      payload: true,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('setIsError', () => {
    const action = {
      type: setIsError.type,
      payload: true,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isError: true,
    });
  });

  it('register fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { user: user, isAuthChecked: true },
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
    });
  });

  it('register pending', () => {
    const action = {
      type: register.pending.type,
      payload: false,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
    });
  });

  it('register rejected', () => {
    const action = {
      type: register.rejected.type,
      payload: { user: null, isAuthChecked: true, isError: true },
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
      isError: true,
    });
  });

  it('login fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { user: user, isAuthChecked: true },
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
    });
  });

  it('login pending', () => {
    const action = {
      type: login.pending.type,
      payload: false,
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
    });
  });

  it('login rejected', () => {
    const action = {
      type: login.rejected.type,
      payload: { user: null, isAuthChecked: true, isError: true },
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
      isError: true,
    });
  });

  it('logout rejected', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: { user: null, isAuthChecked: true },
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
    });
  });
});
