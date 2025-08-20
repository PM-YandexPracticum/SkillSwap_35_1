import type { ReactNode } from 'react';

export type TitleProps = {
  children: ReactNode;
  as: 'h2' | 'h3' | 'h4' | 'h5';
  align?: 'center' | 'left';
  color?: 'mainColorText' | 'accentColorDark';
};
