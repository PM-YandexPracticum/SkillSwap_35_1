export interface IUser {
  id: string;
  name: string;
  city: string;
  dateOfBirth: string;
  avatar: string;
  gender: 'male' | 'female';
  about: string;
  email?: string;
  password?: string;
  can: string[];
  want: string[];
}