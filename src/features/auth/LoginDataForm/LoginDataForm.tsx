/* eslint-disable no-nested-ternary */
import { useState, useCallback, useMemo } from 'react';
import { useFormContext, Controller, useFormState } from 'react-hook-form';
import { InputEmail, InputPassword } from '@ui/input/Input';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import AppleIcon from '@icons/ui/apple.svg?react';
import GoogleIcon from '@icons/ui/google.svg?react';
import EyeIcon from '@icons/ui/eye.svg?react';
import EyeSlashIcon from '@icons/ui/eye-slash.svg?react';
import type { TFormData } from '../registration/form/RegistrationForm';
import type { LoginDataFormProps } from './types';
import styles from './LoginDataForm.module.scss';

const LoginDataForm = ({
  nextStep,
  variant,
  goToRegister
}: LoginDataFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, trigger } = useFormContext<TFormData>();
  const { errors } = useFormState({ control });

  const isStepValid = useMemo(
    () => !errors.email && !errors.password,
    [errors.email, errors.password]
  );

  const handleNextStep = useCallback(async () => {
    const isValid = await trigger(['email', 'password']);

    if (isValid && nextStep) {
      nextStep();
    }
  }, [trigger, nextStep]);

  return (
    <>
      <div className={styles.inputsWraper}>
        {/* кнопки заглушки для входа google/apple */}
        <Button
          variant='secondary'
          onClick={() => {}}
          style={{ borderColor: 'var(--tertiary-color-dark)' }}
        >
          <GoogleIcon />
          <Text tag='span' size='main' align='center'>
            Продолжить с Google
          </Text>
        </Button>
        <Button
          variant='secondary'
          onClick={() => {}}
          style={{ borderColor: 'var(--tertiary-color-dark)' }}
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

        {/* Email */}
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

        {/* Пароль */}
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <InputPassword
              {...field}
              placeholder={
                variant === 'auth' ? 'Введите ваш пароль' : 'Введите пароль'
              }
              label='Пароль'
              type={showPassword ? 'text' : 'password'}
              status={errors.password ? 'error' : undefined}
              message={
                errors.password
                  ? errors.password.message
                  : field.value.length === 0
                    ? (variant === 'auth' ? '' : 'Пароль должен содержать не менее 8 символов')
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
      {variant === 'register' ? (
        <Button onClick={handleNextStep} disabled={!isStepValid}>
          <Text tag='span' size='main' align='center'>
            Далее
          </Text>
        </Button>
      ) : (
        <div className={styles.buttonWrapper}>
          <Button htmlType='submit'>
            <Text tag='span' size='main' align='center'>
              Войти
            </Text>
          </Button>
          <button
            type='button'
            onClick={goToRegister}
            className={styles.registerButton}
          >
            Зарегистрироваться
          </button>
        </div>
      )}
    </>
  );
};

export default LoginDataForm;
