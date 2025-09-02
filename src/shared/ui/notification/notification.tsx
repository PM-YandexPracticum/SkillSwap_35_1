import styles from './notification.module.scss';
import type { NotificationProps } from './types';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import IconIdea from '@icons/ui/idea.svg?react';
import IconCross from '@icons/ui/cross.svg?react';

export const Notification = (props: NotificationProps) => {
  const { text, onClose, onClick} = props;
  return (
    <div className={styles.container}>
      <IconIdea />
      <Title tag='h4'>{text}</Title>
      <button
        type='button'
        className={styles.close}
        onClick={onClose}
        aria-label='Закрыть уведомление'
      >
        <IconCross />
      </button>
      <button
        type='button'
        onClick={onClick}
        className={styles.button}
        aria-label='Перейти в уведомление'
      >
        <Text tag='span' size='details'>Перейти</Text>
      </button>
    </div>
  );
}