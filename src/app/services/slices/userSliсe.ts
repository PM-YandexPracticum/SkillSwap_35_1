/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IUser } from 'src/entities/types/types';

export interface IUserState {
  user: IUser | null;
  isInit: boolean;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isInit: false,
  isAuth: false,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
      state.isInit = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isInit = true;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    userData: (state) => state.user,
    isInit: (state) => state.isInit,
    isAuth: (state) => state.isAuth,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  }
});

export const userReducer = userSlice.reducer;

export const { userData, isInit, isAuth, isLoading, error } =
  userSlice.selectors;

export const { setUser, setIsAuth, logout, setError, clearError } =
  userSlice.actions;
