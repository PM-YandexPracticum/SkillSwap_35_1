import { type ButtonProps } from './types';
import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  htmlType,
  style,
  ...rest
}: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <button
      type={htmlType === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
