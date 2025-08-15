import { type FC } from 'react';
import * as React from 'react';
import type { RadioUiProps } from './type';
import styles from './radioButton.module.scss';
// eslint-disable-next-line import-x/prefer-default-export
export const RadioButton: FC<RadioUiProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  disabled
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.radio}>
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
      <label htmlFor={id}> {label} </label>
    </div>
  );
};
