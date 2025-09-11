import Notification from '@icons/ui/notification.svg?react';
import styles from './notification-bell.module.scss';
import type { NotificationBellProps } from './type';

export const NotificationBell = (props: NotificationBellProps) => {
  const { hasNew, onClick } = props;

  return (
    <div className={styles.notificationBell} onClick={onClick}>
      <Notification className={styles.bellIcon} />
      {hasNew && <span className={styles.notificationDot}></span>}
    </div>
  );
};
