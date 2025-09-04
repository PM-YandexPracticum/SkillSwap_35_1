import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { notificationMiddleware } from '../../../features/requests/notification-middleware/notificationMiddleware';


import type { TypedUseSelectorHook } from 'react-redux';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { SkillSlice } from '../../../entities/skill/model/skills-slice/skillsSlice';
import { userSlice } from '../../../entities/user/model/user-slice/userSliсe';

export const rootReducer = combineSlices(SkillSlice, userSlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
