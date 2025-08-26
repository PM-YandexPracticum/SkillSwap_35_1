import { type FC } from 'react';
import * as React from 'react';
import type { RadioUiProps } from './type';
import styles from './radioButton.module.scss';
import IconActive from '../../assets/icons/ui/radiobutton-active.svg?react';
import IconEmpty from '../../assets/icons/ui/radiobutton-empty.svg?react';

// eslint-disable-next-line import-x/prefer-default-export
export const RadioButton: FC<RadioUiProps> = ({
  id,
  name,
  value,
  checked,
  children,
  onChange,
  disabled
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label htmlFor={id} className={styles.radio}>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.radio__input}
      />
      {checked ? (
        <IconActive className={styles.radio__input__icon} />
      ) : (
        <IconEmpty className={styles.radio__input__icon} />
      )}
      <span className={styles.radio__input__label}>{children}</span>
    </label>
  );
};
