import React, { useId } from 'react';
import SearchIcon from '@icons/ui/search.svg?react';
import { type InputProps } from './types';
import styles from './Input.module.scss';

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  inputSize = 'small',
  label,
  placeholder,
  icon,
  onIconClick,
  status,
  message,
  onChange,
  onFocus,
  style
}) => {
  const inputId = useId(); // для связи с лейблом
  const wrapperClassName = `${styles.inputWrapper} ${styles[`size-${inputSize}`]} ${status ? styles[`input-${status}`] : ''}`;
  const inputClassName = `${styles.inputField} ${status ? styles[`input-${status}`] : ''}`;

  const isSearch = type === 'search'; // для выведения исконки поиска

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={inputId} className={styles.inputLabel}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {isSearch && (
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          className={inputClassName}
          style={style}
        />
        {icon &&
          (onIconClick ? (
            <div
              className={styles.inputIcon}
              role='button'
              tabIndex={0}
              onClick={onIconClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onIconClick();
              }}
              style={{ cursor: 'pointer' }}
            >
              {icon}
            </div>
          ) : (
            <div className={styles.inputIcon}>{icon}</div>
          ))}
      </div>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};

export default Input;

export const InputText = (props: InputProps) => (
  <Input {...props} type='text' />
);

export const InputEmail = (props: InputProps) => (
  <Input {...props} type='email' />
);

export const InputPassword = ({ type, ...props }: InputProps) => (
  <Input {...props} type={type ?? 'password'} />
);

export const InputSearch = (props: InputProps) => (
  <Input {...props} type='search' />
);
