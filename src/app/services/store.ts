import { configureStore, combineSlices, createSlice } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const dummySlice = createSlice({
  name: 'dummy',
  initialState: {},
  reducers: {}
}); // Временный пустой слайс-заглушка

const rootReducer = combineSlices(dummySlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
