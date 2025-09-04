import type { TitleProps } from './types';

import styles from './title.module.scss';

export const Title = ({
  children,
  tag: Tag = 'h2',
  align = 'left',
  color = 'mainColorText',
  extraClassName='',
  ...props
}: TitleProps) => {
  const className = `${styles.title} ${styles[`${color}`]} ${styles[`title${Tag}`]} ${styles[`${align}`]} ${extraClassName}`;

  return <Tag className={className} {...props}>{children}</Tag>;
};
