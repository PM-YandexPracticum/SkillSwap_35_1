import React, { useId, forwardRef } from 'react';
import SearchIcon from '@icons/ui/search.svg?react';
import { type InputProps } from './types';
import styles from './Input.module.scss';

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
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
      onClick,
      style,
      multiline = false,
      rows = 3
    },
    ref
  ) => {
    const inputId = useId(); // для связи с лейблом
    const wrapperClassName = `${styles.inputWrapper} ${styles[`size-${inputSize}`]} ${
      status ? styles[`input-${status}`] : ''
    }`;
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
          {multiline ? (
            <textarea
              id={inputId}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
              className={inputClassName}
              style={style}
              rows={rows}
              ref={ref as React.Ref<HTMLTextAreaElement>}
            />
          ) : (
            <input
              id={inputId}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
              className={inputClassName}
              style={style}
              onClick={onClick}
              ref={ref as React.Ref<HTMLInputElement>}
            />
          )}
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
  }
);

Input.displayName = 'Input';

export default Input;

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input {...props} type='text' ref={ref} />
);

export const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input {...props} type='email' ref={ref} />
);

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => (
    <Input {...props} type={type ?? 'password'} ref={ref} />
  )
);

export const InputSearch = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <Input {...props} type='search' ref={ref} />
);

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ rows = 3, ...props }, ref) => (
    <Input {...props} multiline rows={rows} ref={ref} />
  )
);
