import Notification from '@icons/ui/notification.svg?react';
import styles from './notification-bell.module.scss';
import type { NotificationBellProps } from './type';

export const NotificationBell = (props: NotificationBellProps) => {
  const { hasNew } = props;

  return (
    <div className={styles.notificationBell}>
      <Notification className={styles.bellIcon} />
      {hasNew && <span className={styles.notificationDot}></span>}
    </div>
  );
};
