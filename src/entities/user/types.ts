export interface IUser {
  id: string;
  name: string;
  city: string;
  dateOfBirth: number;
  avatar: string;
  gender: 'male' | 'female';
  about: string;
  email?: string;
  password?: string;
  can: string[];
  want: string[];
}