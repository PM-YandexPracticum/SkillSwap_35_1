import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Input, { InputPassword, InputText } from './Input';
import '../../../index.scss';
// @ts-ignore
import eye from '../../assets/icons/ui/eye.svg';
// @ts-ignore
import eyeSlash from '../../assets/icons/ui/eye-slash.svg';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const NameInput: Story = {
  render: () => {
    const [name, setName] = useState('');

    return (
      <div style={{ width: 400 }}>
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          label='Имя'
          placeholder='Введите ваше имя'
          message='Имя должно содержать только буквы'
        />
      </div>
    );
  }
};

export const NameInputWithError: Story = {
  render: () => {
    const [name, setName] = useState('123');

    return (
      <div style={{ width: 400 }}>
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          label='Имя'
          placeholder='Введите ваше имя'
          status='error'
          message='Имя не должно содержать цифры'
        />
      </div>
    );
  }
};

export const PasswordWithError: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [showError] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div style={{ width: 400 }}>
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          label='Пароль'
          placeholder='Введите ваш пароль'
          status={showError ? 'error' : undefined}
          message={
            showError
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
              <img
                src={showPassword ? eyeSlash : eye}
                alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              />
            </div>
          }
        />
      </div>
    );
  }
};
