import styles from './notification.module.scss';
import type { NotificationProps } from './types';
import { Title } from '@ui/title';
import IconIdea from '@icons/ui/idea.svg?react';
import IconCross from '@icons/ui/cross.svg?react';

export const Notification = (props: NotificationProps) => {
  const { text, onClose } = props;
  return (
    <div className={styles.container}>
      <IconIdea className={styles.icon}/>
      <Title tag='h4'>{text}</Title>
      <button
        type='button'
        className={styles.close}
        onClick={onClose}
        aria-label='Закрыть уведомление'
      >
        <IconCross />
      </button>
    </div>
  );
}