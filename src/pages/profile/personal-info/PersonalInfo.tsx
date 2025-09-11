import { useState, useMemo } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import { InputEmail } from '@ui/input/Input';
import { genderOptions } from '@lib/constants/genders';
import cities from '@lib/constants/cities';
import InputEditIcon from '@icons/ui/edit.svg?react';
import type { IRegisterData } from '../../../features/auth/types/types';
import {
  getUserData,
  updateUser
} from '../../../entities/user/model/user-slice/userSliсe';
import { useDispatch, useSelector } from '../../../app/providers/store/store';
import PersonalInfoFields from './components/PersonalInfoFields';
import PasswordFields from './components/PasswordFields';
import AvatarUploader from './components/AvatarUploader';
import personalInfoSchema from './personalInfoSchema';

import styles from './PersonalInfo.module.scss';

export interface PersonalInfoValues {
  email: string;
  oldPassword: string;
  newPassword: string;
  name: string;
  dateOfBirth: string;
  gender?: 'Женский' | 'Мужской' | '';
  city: string;
  about?: string;
  image?: string | File | null;
}

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: Partial<PersonalInfoValues> = useMemo(
    () => ({
      email: user?.email ?? '',
      oldPassword: '',
      newPassword: '',
      name: user?.name ?? '',
      dateOfBirth: user?.dateOfBirth ?? '',
      gender: user?.gender ?? '',
      city: user?.city ?? '',
      about: user?.about ?? '',
      image: user?.image ?? null
    }),
    [user]
  );

  const methods = useForm<PersonalInfoValues>({
    defaultValues,
    resolver: yupResolver(
      personalInfoSchema as yup.ObjectSchema<PersonalInfoValues>
    ),
    mode: 'onChange'
  });
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue
  } = methods;
  const formValues = useWatch({ control });

  const isFormChanged = useMemo(
    () =>
      Object.keys(defaultValues).some((key) => {
        const currentValue = formValues[key as keyof PersonalInfoValues];
        const defaultValue = defaultValues[key as keyof PersonalInfoValues];
        if ((key === 'oldPassword' || key === 'newPassword') && !showPassword)
          return false;
        if (key === 'image') {
          if (currentValue instanceof File) return true;
          if (currentValue === null && defaultValue !== null) return true;
          return currentValue !== defaultValue;
        }
        return currentValue !== defaultValue;
      }),
    [formValues, defaultValues, showPassword]
  );

  const onSubmit = (data: PersonalInfoValues) => {
    const payload: Partial<IRegisterData> = {};

    Object.keys(defaultValues).forEach((key) => {
      const currentValue = data[key as keyof PersonalInfoValues];
      const defaultValue = defaultValues[key as keyof PersonalInfoValues];
      if (key === 'oldPassword' || key === 'newPassword') return;
      if (key === 'image') {
        if (currentValue instanceof File) {
          payload.image = currentValue;
        } else if (currentValue === null && defaultValue !== null) {
          payload.image = undefined;
        }
      } else if (currentValue !== defaultValue) {
        payload[key as keyof IRegisterData] = currentValue as any;
      }
    });

    if (data.newPassword) {
      if (data.oldPassword !== user?.password) {
        setError('oldPassword', {
          type: 'manual',
          message: 'Текущий пароль введён неверно'
        });
        return;
      }
      payload.password = data.newPassword;
    }
    dispatch(updateUser(payload));
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsWraper}>
          {/* Email */}
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputEmail
                {...field}
                label='Почта'
                status={errors.email ? 'error' : undefined}
                message={errors.email?.message}
                inputSize='full'
                icon={<InputEditIcon />}
              />
            )}
          />

          {/* Кнопка смены пароля */}
          {!showPassword && (
            <button
              type='button'
              onClick={() => setShowPassword(true)}
              className={styles.passwordButton}
            >
              Изменить пароль
            </button>
          )}

          {/* Поля пароля */}
          {showPassword && <PasswordFields control={control} errors={errors} />}

          <PersonalInfoFields
            control={control}
            errors={errors}
            genderOptions={genderOptions}
            cities={cities}
          />

          <Button
            htmlType='submit'
            style={{ marginTop: 18 }}
            disabled={!isFormChanged || !isValid}
          >
            <Text tag='span' size='main' align='center'>
              Сохранить
            </Text>
          </Button>
        </div>

        <div className={styles.avatarWraper}>
          <AvatarUploader control={control} setValue={setValue} />
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalInfo;
