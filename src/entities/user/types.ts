export interface User {
  id: string;
  name: string;
  city: string;
  age: number;
  avatar: string;
  gender: 'male' | 'female';
  about: string;
  email: string;
  password: string;
  can: string;
  want: string;
}