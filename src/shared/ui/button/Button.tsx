import React from 'react';
import { type ButtonProps } from './types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  htmlType,
  style
}) => {
  const className = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <button
      type={htmlType === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
