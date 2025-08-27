/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import { InputEmail, InputPassword } from '@ui/input/Input';
import AppleIcon from '@icons/ui/apple.svg?react';
import GoogleIcon from '@icons/ui/google.svg?react';
import EyeIcon from '@icons/ui/eye.svg?react';
import EyeSlashIcon from '@icons/ui/eye-slash.svg?react';
import { useFormContext, Controller } from 'react-hook-form';
import styles from './StepOne.module.scss';
import type { TFormData } from '../../RegistrationForm';

interface StepOneProps {
  nextStep: () => void;
}

const StepOne = ({ nextStep }: StepOneProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, trigger } = useFormContext<TFormData>();
  const { errors } = formState;

  const handleNextStep = async () => {
    const isEmailValid = await trigger('email');
    const isPasswordValid = await trigger('password');

    if (isEmailValid && isPasswordValid) {
      nextStep();
    }
  };

  const { getFieldState } = useFormContext<TFormData>();
  const emailState = getFieldState('email');
  const passwordState = getFieldState('password');
  const isStepValid = !emailState.invalid && !passwordState.invalid;

  return (
    <>
      <div className={styles.inputsWraper}>
        {/* кнопки заглушки для входа apple/google */}
        <Button
          variant='secondary'
          onClick={() => {}}
          style={{ borderColor: '#69735D' }}
        >
          <GoogleIcon />
          <Text tag='span' size='main' align='center'>
            Продолжить с Google
          </Text>
        </Button>
        <Button
          variant='secondary'
          onClick={() => {}}
          style={{ borderColor: '#69735D' }}
        >
          <AppleIcon />
          <Text tag='span' size='main' align='center'>
            Продолжить с Apple
          </Text>
        </Button>
        <div className={styles.orSeparator}>
          <hr />
          <Text tag='span' size='main' align='center'>
            или
          </Text>
          <hr />
        </div>

        {/* Email поле с валидацией */}
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <InputEmail
              {...field}
              placeholder='Введите email'
              label='Email'
              status={errors.email ? 'error' : undefined}
              message={errors.email?.message}
            />
          )}
        />

        {/* Password поле с валидацией */}
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <InputPassword
              {...field}
              placeholder='Введите пароль'
              label='Пароль'
              type={showPassword ? 'text' : 'password'}
              status={errors.password ? 'error' : undefined}
              message={
                errors.password
                  ? errors.password.message
                  : field.value.length === 0
                    ? 'Пароль должен содержать не менее 8 символов'
                    : undefined
              }
              icon={
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  role='button'
                  tabIndex={0}
                  onClick={() => setShowPassword((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              }
            />
          )}
        />
      </div>
      <Button onClick={handleNextStep} disabled={!isStepValid}>
        <Text tag='span' size='main' align='center'>
          Далее
        </Text>
      </Button>
    </>
  );
};

export default StepOne;
