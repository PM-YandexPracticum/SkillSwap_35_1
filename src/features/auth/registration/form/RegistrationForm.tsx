import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  ISkill,
  IDesiredSkill
} from 'src/entities/skill/model/types/types';
import registrationSchema from './registrationSchema';
import styles from './RegistrationForm.module.scss';
import LoginDataForm from '../../LoginDataForm/LoginDataForm';
import UserDataForm from '../../UserDataForm/UserDataForm';
import SkillDataForm from '../../SkillDataForm/SkillDataForm';
import RegistrationInfo from '../info/RegistrationInfo';

export interface TFormData {
  email: string;
  password: string;
  name: string;
  city: string;
  gender: 'Мужской' | 'Женский' | '';
  dateOfBirth: string;
  want: IDesiredSkill[];
  can: ISkill;
  image?: File;
}

const RegistrationForm = () => {
  const [step, setStep] = useState(2);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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

  const onSubmit = (data: TFormData) => {
    localStorage.setItem('registrationData', JSON.stringify(data));
  };

  return (
    <div className={styles.registrationPage}>
      <FormProvider {...methods}>
        <form
          className={`${styles.container} ${styles[`step-${step}`]}`}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {step === 1 && <LoginDataForm nextStep={nextStep} />}
          {step === 2 && (
            <UserDataForm nextStep={nextStep} prevStep={prevStep} />
          )}
          {/* ЗАГЛУШКА по макету сабмит будет в модальном окне, дополнить */}
          {step === 3 && (
            <SkillDataForm prevStep={prevStep} onReady={() => {}} />
          )}
          {/* ЗАГЛУШКА тут будет шаг 4 с открытием модалки со SkillDetails can variant */}
        </form>
      </FormProvider>
      <RegistrationInfo step={step} />
    </div>
  );
};

export default RegistrationForm;
