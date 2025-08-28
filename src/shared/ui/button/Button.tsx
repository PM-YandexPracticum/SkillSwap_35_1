import { type ButtonProps } from './types';
import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  htmlType,
  style
}: ButtonProps) => {
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
