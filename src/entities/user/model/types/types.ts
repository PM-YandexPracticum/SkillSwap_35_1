import type {
  ISkill,
  IDesiredSkill
} from 'src/entities/skill/model/types/types';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  about: string;
  gender: 'Женский' | 'Мужской';
  dateOfBirth: string;
  city: string;
  image?: string;
  can: ISkill;
  want: IDesiredSkill[];
  likeCount: number;
  favorites: string[];
  incomingRequests: string[];
  outgoingRequests: string[];
  exchanges: string[];
  createdAt: string;
}

export type IUserPublic = Omit<
  IUser,
  | 'email'
  | 'password'
  | 'favorites'
  | 'incomingRequests'
  | 'outgoingRequests'
  | 'exchanges'
>;
