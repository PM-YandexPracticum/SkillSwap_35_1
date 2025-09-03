import * as yup from 'yup';
import type { TLoginData } from './LoginForm';

const loginSchema: yup.ObjectSchema<TLoginData> = yup.object({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Введите email'),

  password: yup
    .string()
    .min(8, 'Пароль должен содержать не менее 8 знаков')
    .required('Введите пароль')
});

export default loginSchema;
