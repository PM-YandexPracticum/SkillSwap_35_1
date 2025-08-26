import type { ReactNode } from 'react';

export interface RadioUiProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
//  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}
