import styles from './checkbox.module.scss';
import type { ReactNode } from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
  variant?: 'minus';
  children?: ReactNode;
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, variant, onChange, children } = props;

  return (
	<label className={styles.container}>
	  <input type='checkbox' className={styles.hidden} checked={checked} onChange={onChange} />
	  <span className={styles.checkmark} data-variant={variant} ></span>
	  {children}
	</label>
  );
};
