import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { InputPassword } from '@ui/input/Input';
import type { PersonalInfoValues } from '../PersonalInfo';

interface PasswordFieldsProps {
  control: Control<PersonalInfoValues>;
  errors: FieldErrors<PersonalInfoValues>;
}

const PasswordFields = ({ control, errors }: PasswordFieldsProps) => (
  <>
    <Controller
      name='oldPassword'
      control={control}
      rules={{ required: 'Введите старый пароль' }}
      render={({ field }) => (
        <InputPassword
          {...field}
          label='Старый пароль'
          status={errors.oldPassword ? 'error' : undefined}
          message={errors.oldPassword?.message}
          inputSize='full'
        />
      )}
    />
    <Controller
      name='newPassword'
      control={control}
      rules={{ required: 'Введите новый пароль' }}
      render={({ field }) => (
        <InputPassword
          {...field}
          label='Новый пароль'
          status={errors.newPassword ? 'error' : undefined}
          message={errors.newPassword?.message}
          inputSize='full'
        />
      )}
    />
  </>
);

export default PasswordFields;
