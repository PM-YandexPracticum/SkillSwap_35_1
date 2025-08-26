export interface ISkill {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  images?: string[];
}

export interface IDesiredSkill {
  category: string;
  subcategory: string;
}

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
  favourites: string[];
  requests: string[];
  exchanges: string[];
  createdAt: string;
}

export type IUserPublic = Omit<IUser, 'email' | 'password' | 'favourites' | 'requests' | 'exchanges'>;
