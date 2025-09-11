import type { ReactNode } from 'react';

export type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
  variant?: 'minus';
  children?: ReactNode;
  name?: string;
  value?: string;
  ariaLabel?: string;
};
