export interface User {
  id: string;
  name: string;
  city: string;
  age: number;
  avatar: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
}
