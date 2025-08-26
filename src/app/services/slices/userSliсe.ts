/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { type IUser } from 'src/entities/types/types';
import {
  mockToggleFavorites,
  mockRequest,
  mockDecline,
  mockAccept,
  mockUpdateUser,
  mockRegisterUser,
  mockLoginUser,
  mockLogout,
  type IRegisterData,
  type ILoginData
} from 'src/api/mockApi';

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

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: IRegisterData, { rejectWithValue }) => {
    try {
      const response = await mockRegisterUser(userData);
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
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при выходе');
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      // Переключение избранных
      .addCase(toggleFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          if (action.payload.status === 'added') {
            state.user.favourites.push(action.payload.userId);
          } else {
            state.user.favourites = state.user.favourites.filter(
              (id) => id !== action.payload.userId
            );
          }
        }
      })
      .addCase(toggleFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Отправка заявки
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.user &&
          !state.user.outgoingRequests.includes(action.payload)
        ) {
          state.user.outgoingRequests.push(action.payload);
        }
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Отклонение заявки
      .addCase(declineRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(declineRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.incomingRequests = state.user.incomingRequests.filter(
            (id) => id !== action.payload
          );
        }
      })
      .addCase(declineRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Принятие заявки
      .addCase(acceptRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user && !state.user.exchanges.includes(action.payload)) {
          state.user.exchanges.push(action.payload);
          state.user.incomingRequests = state.user.incomingRequests.filter(
            (id) => id !== action.payload
          );
        }
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.isInit = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })

      // Вход пользователя
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.isInit = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })

      // Выход пользователя
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isInit = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
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
