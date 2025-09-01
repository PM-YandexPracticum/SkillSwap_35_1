import type { TextProps } from './types';
import styles from './text.module.scss';

export const Text = ({
  children,
  tag: Tag = 'div',
  size = 'main',
  color = 'mainColorText',
  family = 'main',
  align = 'left',
  extraClassName = ''
}: TextProps) => {
  const className = `${styles.text} ${styles[`text${size}`]} ${styles[`${family}`]} ${styles[`${color}`]} ${styles[`${align}`]} ${extraClassName}`;

  return <Tag className={className}>{children}</Tag>;
};
