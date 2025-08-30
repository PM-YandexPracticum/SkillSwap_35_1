import { type ISkill, type IDesiredSkill } from '../../../entities/skill/model/types/types';

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
  about?: string;
  city: string;
  gender: 'Мужской' | 'Женский' | undefined;
  dateOfBirth: string;
  want: IDesiredSkill[];
  can: (Omit<ISkill, 'images'> & { images?: File[] });
  image?: File;
}