import type { ReactNode } from 'react';

export type TitleProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4';
  align?: 'center' | 'left';
  color?: 'mainColorText' | 'accentColorDark';
};
