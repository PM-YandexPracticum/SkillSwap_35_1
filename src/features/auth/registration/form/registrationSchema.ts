import * as yup from 'yup';
import { type TFormData } from './RegistrationForm';

const checkEmailExists = async (email: string) => {
  // email для проверки ошибки уже существующего email
  const existingEmails = ['test@mail.com', 'user@mail.com'];
  await new Promise((r) => {
    setTimeout(r, 500);
  });
  return !existingEmails.includes(email);
};

const registrationSchema: yup.ObjectSchema<TFormData> = yup.object({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Введите email')
    .test('email-unique', 'Email уже используется', async (value) =>
      value ? checkEmailExists(value) : false
    ),

  password: yup
    .string()
    .min(8, 'Пароль должен содержать не менее 8 знаков')
    .required('Введите пароль'),

  image: yup
    .mixed<File>()
    .optional()
    .test(
      'fileType',
      'Неверный формат файла',
      (value) =>
        !value ||
        (value instanceof File &&
          ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
    ),

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
    .oneOf(['Мужской', 'Женский', '', undefined], 'Выберите пол')
    .optional(),

  city: yup.string().required('Укажите город'),

  want: yup
    .array()
    .of(
      yup.object({
        category: yup.string().required('Выберите категорию'),
        subcategory: yup.string().required('Выберите подкатегорию')
      })
    )
    .min(1, 'Выберите хотя бы один навык')
    .test(
      'at-least-one-valid-skill',
      'Выберите подкатегории для всех выбранных категорий',
      (items) =>
        items?.every(
          (item) => !item.category || (item.category && item.subcategory)
        ) ?? false
    )
    .required(),

  can: yup
    .object({
      title: yup
        .string()
        .max(40, 'Название не должно превышать 40 символов')
        .required('Необходимо ввести название вашего навыка'),
      category: yup.string().required('Выберите категорию'),
      subcategory: yup.string().required('Выберите подкатегорию'),
      description: yup
        .string()
        .max(270, 'Описание не должно превышать 270 символов')
        .required('Необходимо ввести описание вашего навыка'),
      images: yup.array().of(yup.mixed<File>().defined()).optional().default([])
    })
    .required()
});

export default registrationSchema;
