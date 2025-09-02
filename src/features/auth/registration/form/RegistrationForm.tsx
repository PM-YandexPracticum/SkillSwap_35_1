import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  ISkill,
  IDesiredSkill
} from 'src/entities/skill/model/types/types';
import { useDispatch } from '../../../../app/providers/store/store';
import { registerUser } from '../../../../entities/user/model/user-slice/userSliсe';
import registrationSchema from './registrationSchema';
import LoginDataForm from '../../LoginDataForm/LoginDataForm';
import UserDataForm from '../../UserDataForm/UserDataForm';
import SkillDataForm from '../../SkillDataForm/SkillDataForm';
import RegistrationInfo from '../info/RegistrationInfo';
import styles from './RegistrationForm.module.scss';

export interface TFormData {
  email: string;
  password: string;
  name: string;
  city: string;
  gender?: 'Мужской' | 'Женский' | '';
  dateOfBirth: string;
  want: IDesiredSkill[];
  can: Omit<ISkill, 'images'> & { images?: File[] };
  image?: File;
}

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const methods = useForm<TFormData>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      city: '',
      gender: '',
      dateOfBirth: '',
      image: undefined,
      can: {
        category: '',
        subcategory: '',
        title: '',
        description: '',
        images: []
      },
      want: []
    }
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: TFormData) => {
    // преобразование пустой строки при выборе пола в underfined
    const preparedData = {
      ...data,
      gender: data.gender === '' ? undefined : data.gender
    };

    try {
      await dispatch(registerUser(preparedData)).unwrap();

      // TODO: открыть модалку успешной регистрации
    } catch (err) {
      // TODO: возможно дополнить выводом ошибок, пока стоит заглушка
      // eslint-disable-next-line no-console
      console.error('Ошибка при регистрации:', err);
    }
  };

  return (
    <div className={styles.registrationPage}>
      <FormProvider {...methods}>
        <form
          className={`${styles.container} ${styles[`step-${step}`]}`}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {step === 1 && (
            <LoginDataForm variant='register' nextStep={nextStep} />
          )}
          {step === 2 && (
            <UserDataForm nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && <SkillDataForm prevStep={prevStep} />}
        </form>
      </FormProvider>
      <RegistrationInfo step={step} />
    </div>
  );
};

export default RegistrationForm;
