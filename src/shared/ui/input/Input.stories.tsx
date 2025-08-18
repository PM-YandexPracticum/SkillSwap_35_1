import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import EyeIcon from '@icons/ui/eye.svg?react';
import EyeSlashIcon from '@icons/ui/eye-slash.svg?react';
import CrossIcon from '@icons/ui/cross.svg?react';
import Input, { InputPassword, InputText, InputSearch } from './Input';
import '../../../index.scss';

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
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          }
        />
      </div>
    );
  }
};

export const SearchInput: Story = {
  render: () => {
    const [query, setQuery] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 700,
          height: 100,
          backgroundColor: 'var(--bg-color)'
        }}
      >
        <InputSearch
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Искать навык'
          inputSize='large'
          icon={query ? <CrossIcon /> : undefined}
          onIconClick={() => setQuery('')}
        />
      </div>
    );
  }
};
