import type { TitleProps } from './types';

import styles from './title.module.scss';

export const Title = ({
  children,
  as: Tag = 'h2',
  align = 'left',
  color = 'mainColorText'
}: TitleProps) => {
  const className = `${styles.title} ${styles[`${color}`]} ${styles[`title${Tag}`]} ${styles[`${align}`]}`;

  return <Tag className={className}>{children}</Tag>;
};
