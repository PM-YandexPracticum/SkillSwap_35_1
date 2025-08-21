import type { ReactNode } from 'react';

export type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
  variant?: 'minus';
  name?: string;
  value?: string;
  children?: ReactNode;
};
