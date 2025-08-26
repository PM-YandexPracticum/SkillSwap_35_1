import { type IUser, type IUserPublic } from '../entities/types/types';
import { multiplyArrayElements } from '../utils';

export type IRegisterData = Omit<
  IUser,
  | 'id'
  | 'createdAt'
  | 'likeCount'
  | 'favourites'
  | 'incomingRequests'
  | 'outgoingRequests'
  | 'exchanges'
>;
export interface ILoginData {
  email: string;
  password: string;
}

interface ITokens {
  refreshToken: string;
  accessToken: string;
}

export type IAuthResponse = ITokens & {
  user: IUser;
};

export type TLikeResponse = {
  status: 'added' | 'removed';
  userId: string;
};

export interface logoutRespose {
  success: boolean;
}

interface IErrorResponse {
  status: number;
  message: string;
}

const getStoredUsers = (): IUser[] => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
};

const setStoredUsers = (users: IUser[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const updateStoredUser = (userId: string, update: Partial<IUser>) => {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1)
    throw { status: 404, message: 'Пользователь не найден' } as IErrorResponse;
  users[index] = { ...users[index], ...update };
  setStoredUsers(users);
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const createTokens = async (): Promise<ITokens> => {
  await delay(100);
  const accessToken = 'mockAccessToken-' + Date.now();
  const refreshToken = 'mockRefreshToken-' + Date.now();
  return { accessToken, refreshToken };
};

const getCurrentUser = (): IUser => {
  const currentUserId = localStorage.getItem('currentUser');
  const users = getStoredUsers();
  const user = users.find((u) => u.id === currentUserId);
  if (!user)
    throw { status: 404, message: 'Пользователь не найден' } as IErrorResponse;
  return user;
};

// Получение карточек

export const mockGetSkills = async (): Promise<IUserPublic[]> => {
  await delay(300);
  const response = await fetch('/db/users.json');
  const data: IUserPublic[] = await response.json();
  return multiplyArrayElements(data);
};

// Добавление /удаление избранного

export const mockToggleFavourites = async (
  likedId: string
): Promise<TLikeResponse> => {
  await delay(200);
  const user = getCurrentUser();
  let status: 'added' | 'removed';
  if (user.favourites.includes(likedId)) {
    user.favourites = user.favourites.filter((id) => id !== likedId);
    status = 'removed';
  } else {
    user.favourites.push(likedId);
    status = 'added';
  }
  updateStoredUser(user.id, { favourites: user.favourites });
  return { userId: likedId, status: status };
};

// Заявка на обмен навыками

export const mockRequest = async (requestedId: string): Promise<string> => {
  await delay(200);
  const user = getCurrentUser();
  if (!user.outgoingRequests.includes(requestedId))
    user.outgoingRequests.push(requestedId);
  updateStoredUser(user.id, { outgoingRequests: user.outgoingRequests });
  return requestedId;
};

// Отклонение заявки

export const mockDecline = async (declinedId: string): Promise<string> => {
  await delay(200);
  const user = getCurrentUser();
  if (user.incomingRequests.includes(declinedId))
    user.incomingRequests = user.incomingRequests.filter(
      (id) => id !== declinedId
    );
  updateStoredUser(user.id, { incomingRequests: user.incomingRequests });
  return declinedId;
};

// Принятие заявки

export const mockAccept = async (acceptedId: string): Promise<string> => {
  await delay(200);
  const user = getCurrentUser();
  if (!user.exchanges.includes(acceptedId)) user.exchanges.push(acceptedId);
  updateStoredUser(user.id, { exchanges: user.exchanges });
  return acceptedId;
};


// Обновление данных пользователя

export const mockUpdateUser = async (
  update: Partial<IRegisterData>
): Promise<IUser> => {
  await delay(200);
  const user = getCurrentUser();
  Object.assign(user, update);
  updateStoredUser(user.id, update);
  return user;
};

// Регистрация пользователя (пользователь добавляется в local storage)

export const mockRegisterUser = async (
  data: IRegisterData
): Promise<IAuthResponse> => {
  await delay(300);
  const users = getStoredUsers();
  const newUser: IUser = {
    ...data,
    id: Date.now().toString() + Math.floor(Math.random() * 1000),
    likeCount: 0,
    favourites: [],
    incomingRequests: [],
    outgoingRequests: [],
    exchanges: [],
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  setStoredUsers(users);
  localStorage.setItem('currentUser', newUser.id);
  const tokens = await createTokens();
  return { user: newUser, ...tokens };
};

// Логин пользователя

export const mockLoginUser = async (
  data: ILoginData
): Promise<IAuthResponse> => {
  await delay(300);
  const users = getStoredUsers();
  const user = users.find(
    (u) => u.email === data.email && u.password === data.password
  );
  if (!user)
    throw { status: 401, message: 'Неправильные данные' } as IErrorResponse;
  localStorage.setItem('currentUser', user.id);
  const tokens = await createTokens();
  return { user, ...tokens };
};

// Выход пользователя

export const mockLogout = async (): Promise<logoutRespose> => {
  await delay(100);
  localStorage.removeItem('currentUser');
  return { success: true };
};
