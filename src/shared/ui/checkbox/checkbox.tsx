import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types';
import IconCheckboxEmpty from '@icons/ui/checkbox-empty.svg?react';
import IconCheckboxDone from '@icons/ui/checkbox-done.svg?react';
import IconCheckboxRemove from '@icons/ui/checkbox-remove.svg?react';

export const Checkbox = (props: CheckboxProps) => {
  const { checked, variant, onChange, children } = props;

  const IconChecked =
    variant === 'minus' ? IconCheckboxRemove : IconCheckboxDone;

  return (
    <label className={styles.container}>
      <input
        type='checkbox'
        className={styles.hidden}
        checked={checked}
        onChange={onChange}
      />
      {checked ? (
        <IconChecked className={styles.checked} />
      ) : (
        <IconCheckboxEmpty className={styles.empty} />
      )}
      {children}
    </label>
  );
};
