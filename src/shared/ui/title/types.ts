import type { ReactNode, HTMLAttributes } from 'react';

export type TitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  tag: 'h2' | 'h3' | 'h4' | 'h5';
  align?: 'center' | 'left';
  color?: 'mainColorText' | 'accentColorDark';
  extraClassName?: string;
};
