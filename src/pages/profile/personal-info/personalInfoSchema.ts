import * as yup from 'yup';
import type { PersonalInfoValues } from './PersonalInfo';

const personalInfoSchema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Введите email'),

  oldPassword: yup.string().optional(),

  newPassword: yup.string().when('oldPassword', {
    is: (val: string) => val && val.length > 0,
    then: (schema) =>
      schema
        .required('Введите новый пароль')
        .min(8, 'Пароль должен содержать не менее 8 знаков'),
    otherwise: (schema) => schema.notRequired()
  }),

  name: yup.string().required('Введите ваше имя'),

  dateOfBirth: yup
    .string()
    .required('Введите дату рождения')
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат: дд.мм.гггг')
    .test('is-valid-date', 'Некорректная дата', (value) => {
      if (!value) return false;
      const [day, month, year] = value.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    })
    .test('not-in-future', 'Вы не можете выбрать будущую дату', (value) => {
      if (!value) return false;
      const [day, month, year] = value.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      return date <= new Date();
    }),

  gender: yup
    .mixed<'Мужской' | 'Женский' | ''>()
    .oneOf(['Мужской', 'Женский', ''], 'Выберите пол')
    .optional(),

  city: yup.string().required('Укажите город'),

  about: yup
    .string()
    .max(270, 'Описание не должно превышать 270 символов')
    .optional(),

  image: yup
    .mixed()
    .nullable()
    .optional()
    .test(
      'fileType',
      'Неверный формат файла',
      (value) =>
        !value ||
        typeof value === 'string' ||
        (value instanceof File &&
          ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
    )
}) as yup.ObjectSchema<Partial<PersonalInfoValues>>;

export default personalInfoSchema;
