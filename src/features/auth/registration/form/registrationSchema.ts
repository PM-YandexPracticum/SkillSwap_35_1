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
  name: yup.string().required('Введите ваше имя'),
  city: yup.string().required('Укажите город'),
  gender: yup.string().oneOf(['male', 'female'], 'Выберете пол').required(),
  dateOfBirth: yup
    .string()
    .required('Введите дату рождения')
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат: дд.мм.гггг'),
  image: yup.string().defined().optional(),

  can: yup
    .object({
      category: yup.string().required(),
      subcategory: yup.string().required(),
      title: yup.string().required(),
      description: yup.string().required(),
      images: yup.array().of(yup.string().defined()).optional()
    })
    .required(),

  want: yup
    .array()
    .of(
      yup.object({
        category: yup.string().required('Выберите категорию'),
        subcategory: yup.string().required('Выберите подкатегорию')
      })
    )
    .min(1, 'Выберите хотя бы один навык')
    .required()
});

export default registrationSchema;
