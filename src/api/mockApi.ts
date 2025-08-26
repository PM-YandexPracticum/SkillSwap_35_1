import { type IUser, type IUserPublic } from '../entities/types/types';
import { multiplyArrayElements } from '../utils';


export type TRegisterData = Omit<IUser, 'id' | 'createdAt' | 'likeCount'>;

export type TLoginData = { email: string; password: string; };

const getStoredUsers = (): IUser[] => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
};

const setStoredUsers = (users: IUser[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const simulateTokenRefresh = async () => {
  await delay(100);
  const accessToken = 'mockAccessToken-' + Date.now();
  const refreshToken = 'mockRefreshToken-' + Date.now();
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return { accessToken, refreshToken };
};

const getCurrentUser = (): IUser => {
  const currentUserId = localStorage.getItem('currentUser');
  const users = getStoredUsers();
  const user = users.find(u => u.id === currentUserId);
  if (!user) throw { success: false, message: 'Пользователь не найден' };
  return user;
};

export const mockGetSkills = async (): Promise<IUserPublic[]> => {
  await delay(500);
  const response = await fetch('/db/users.json');
  const data: IUserPublic[] = await response.json();
  return multiplyArrayElements(data);
};

export const mockGetSkillById = async (id: string): Promise<IUserPublic> => {
  await delay(200);
  const response = await fetch('/db/users.json');
  const skills: IUserPublic[] = await response.json();
  const skill = skills.find(s => s.id === id);
  if (!skill) throw { success: false, message: 'Публикация не найдена' };
  return skill;
};

export const mockToggleFavourites = async (likedId: string) => {
  await delay(200);
  const user = getCurrentUser();
  let status: 'added' | 'removed';
  if (user.favourites.includes(likedId)) {
    user.favourites = user.favourites.filter(id => id !== likedId);
    status = 'removed';
  } else {
    user.favourites.push(likedId);
    status = 'added';
  }
  setStoredUsers(getStoredUsers());
  await simulateTokenRefresh();
  return { success: true, status, id: likedId };
};


export const mockRequest = async (requestedId: string) => {
  await delay(200);
  const user = getCurrentUser();
  if (!user.requests.includes(requestedId)) user.requests.push(requestedId);
  setStoredUsers(getStoredUsers());
  await simulateTokenRefresh();
  return { success: true, requested: requestedId };
};

export const mockAccept = async (acceptedId: string) => {
  await delay(200);
  const user = getCurrentUser();
  if (!user.exchanges.includes(acceptedId)) user.exchanges.push(acceptedId);
  setStoredUsers(getStoredUsers());
  await simulateTokenRefresh();
  return { success: true, accepted: acceptedId };
};

export const mockGetUser = async () => {
  await delay(200);
  const user = getCurrentUser();
  await simulateTokenRefresh();
  return { success: true, user };
};

export const mockUpdateUser = async (update: Partial<TRegisterData>) => {
  await delay(200);
  const user = getCurrentUser();
  Object.assign(user, update);
  setStoredUsers(getStoredUsers());
  await simulateTokenRefresh();
  return { success: true, user };
};

export const mockRegisterUser = async (data: TRegisterData) => {
  await delay(300);
  const users = getStoredUsers();
  const newUser: IUser = {
    ...data,
    id: Date.now().toString() + Math.floor(Math.random() * 1000),
    likeCount: 0,
    requests: [],
    exchanges: [],
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  setStoredUsers(users);
  localStorage.setItem('currentUser', newUser.id);
  const tokens = await simulateTokenRefresh();
  return { success: true, user: newUser, ...tokens };
};

export const mockLoginUser = async (data: TLoginData) => {
  await delay(300);
  const users = getStoredUsers();
  const user = users.find(u => u.email === data.email && u.password === data.password);
  if (!user) throw { success: false, message: 'Введены неправильные данные' };
  localStorage.setItem('currentUser', user.id);
  const tokens = await simulateTokenRefresh();
  return { success: true, user, ...tokens };
};

export const mocklogout = async () => {
  await delay(100);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
  return { success: true };
};
