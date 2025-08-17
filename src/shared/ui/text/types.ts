import type { ElementType, ReactNode } from 'react';

export type TextProps = {
  children: ReactNode;
  as: ElementType;
  size: 'main' | 'details';
  color?:
    | 'mainColorText'
    | 'tertiaryColorDark'
    | 'tertiaryColorLight'
    | 'accentColorDark'
    | 'colorError';
  family?: 'main' | 'userName';
  align?: 'center' | 'left';
};
