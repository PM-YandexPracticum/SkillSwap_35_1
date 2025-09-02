/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createSelector,
  type PayloadAction
} from '@reduxjs/toolkit';
import { type IUser } from "../types/types";
import type { RootState } from '../../../../app/providers/store/store';
import type { IRegisterData } from 'src/features/auth/types/types';
import {
  mockToggleFavorites,
  mockRequest,
  mockDecline,
  mockAccept,
  mockUpdateUser,
  mockRegisterUser,
  mockLoginUser,
  mockLogout,
  mockGetUser,
  mockViewNotification,
  mockViewAllNotifications,
  mockRemoveViewedNotifications,
  type ILoginData
} from '../../../../api/mockApi';

export interface IUserState {
  user: IUser | null;
  isInit: boolean;
  isAuth: boolean;
  userLoading: boolean;
  actionLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isInit: false,
  isAuth: false,
  userLoading: false,
  actionLoading: false,
  error: null
};

export const toggleFavorites = createAsyncThunk(
  'user/toggleFavorites',
  async (likedId: string, { rejectWithValue }) => {
    try {
      const response = await mockToggleFavorites(likedId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка при изменении избранного'
      );
    }
  }
);

export const sendRequest = createAsyncThunk(
  'user/sendRequest',
  async (requestedId: string, { rejectWithValue }) => {
    try {
      const response = await mockRequest(requestedId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при отправке заявки');
    }
  }
);

export const declineRequest = createAsyncThunk(
  'user/declineRequest',
  async (declinedId: string, { rejectWithValue }) => {
    try {
      const response = await mockDecline(declinedId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при отклонении заявки');
    }
  }
);

export const acceptRequest = createAsyncThunk(
  'user/acceptRequest',
  async (acceptedId: string, { rejectWithValue }) => {
    try {
      const response = await mockAccept(acceptedId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при принятии заявки');
    }
  }
);

export const viewNotification = createAsyncThunk(
  'user/viewNotification',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const response = await mockViewNotification(notificationId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при просмотре уведомления');
    }
  }
);

export const viewAllNotifications = createAsyncThunk(
  'user/viewAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockViewAllNotifications();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при просмотре всех уведомлений');
    }
  }
);

export const removeViewedNotifications = createAsyncThunk(
  'user/removeViewedNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockRemoveViewedNotifications();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при удалении просмотренных уведомлений');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: Partial<IRegisterData>, { rejectWithValue }) => {
    try {
      const response = await mockUpdateUser(updateData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка при обновлении данных пользователя'
      );
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockGetUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка при получении данных пользователя'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: IRegisterData, { rejectWithValue }) => {
    try {
      const response = await mockRegisterUser(userData);
      localStorage.setItem('accessToken', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: ILoginData, { rejectWithValue }) => {
    try {
      const response = await mockLoginUser(loginData);
      localStorage.setItem('accessToken', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при авторизации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockLogout();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при выходе');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      await dispatch(getUser());
    } else {
      dispatch(userSlice.actions.setUser(null));
    }
  }
);

export const userSlice = createSlice({
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
  extraReducers: (builder) => {
    builder
      // Переключение избранных
      .addCase(toggleFavorites.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          if (action.payload.status === 'added') {
            state.user.favorites.push(action.payload.userId);
          } else {
            state.user.favorites = state.user.favorites.filter(
              (id) => id !== action.payload.userId
            );
          }
        }
      })
      .addCase(toggleFavorites.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Отправка заявки
      .addCase(sendRequest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          const notification = action.payload;
          if (!state.user.outgoingRequests.includes(notification.to)) {
            state.user.outgoingRequests.push(notification.to);
          }
          state.user.notifications.new.push(notification);
        }
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Отклонение заявки
      .addCase(declineRequest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(declineRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          const notification = action.payload;
          state.user.incomingRequests = state.user.incomingRequests.filter(
            (id) => id !== notification.to
          );
          state.user.notifications.new.push(notification);
        }
      })
      .addCase(declineRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Принятие заявки
      .addCase(acceptRequest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          const notification = action.payload;
          if (!state.user.exchanges.includes(notification.to)) {
            state.user.exchanges.push(notification.to);
          }
          state.user.incomingRequests = state.user.incomingRequests.filter(
            (id) => id !== notification.to
          );
          state.user.notifications.new.push(notification);
        }
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Просмотр одного уведомления
      .addCase(viewNotification.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(viewNotification.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          const notification = action.payload;

          state.user.notifications.new = state.user.notifications.new.filter(
            (n) => n.id !== notification.id
          );

          state.user.notifications.viewed.push(notification);
        }
      })
      .addCase(viewNotification.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Просмотр всех уведомлений
      .addCase(viewAllNotifications.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(viewAllNotifications.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.user) {
          const moved = action.payload;
          state.user.notifications.viewed.push(...moved);
          state.user.notifications.new = [];
        }
      })
      .addCase(viewAllNotifications.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Удаление просмотренных уведомлений
      .addCase(removeViewedNotifications.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeViewedNotifications.fulfilled, (state) => {
        state.actionLoading = false;
        if (state.user) {
          state.user.notifications.viewed = [];
        }
      })
      .addCase(removeViewedNotifications.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload as string;
      })

      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.isInit = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
        state.isInit = true;
      })

      // Вход пользователя
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.isInit = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
        state.isInit = true;
      })

      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.isInit = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isInit = true;
        state.error = action.payload as string;
      })


      // Выход пользователя
      .addCase(logoutUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isInit = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload as string;
        state.isInit = true;
      });
  },
});

export const userReducer = userSlice.reducer;

export const getUserData = (state: RootState) => state.user.user;
export const getIsInit = (state: RootState) => state.user.isInit;
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getUserLoading = (state: RootState) => state.user.userLoading;
export const getActionLoading = (state: RootState) => state.user.actionLoading;
export const getError = (state: RootState) => state.user.error;
export const getNewNotifications = (state: RootState) =>
  state.user.user?.notifications.new ?? [];
export const getViewedNotifications = (state: RootState) =>
  state.user.user?.notifications.viewed ?? [];
export const getNotificationById = (id: string) =>
  createSelector([getNewNotifications, getViewedNotifications], (newNotifs, viewedNotifs) => {
    return newNotifs.find((n) => n.id === id) || viewedNotifs.find((n) => n.id === id) || null;
  });

export const { setUser, setIsAuth, logout, setError, clearError } =
  userSlice.actions;
