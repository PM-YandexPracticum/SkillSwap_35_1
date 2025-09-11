import styles from './NotificationMenu.module.scss';
import { useMemo } from 'react';
import { useSelector, useDispatch } from '../../../app/providers/store/store';
import Lightbulb from '@icons/ui/idea.svg?react';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Button from '@ui/button/Button';
import {
  getNewNotifications,
  getViewedNotifications,
  viewAllNotifications,
  removeViewedNotifications
} from '@entities/user/model/user-slice/userSliсe';
import {
  type IFormattedNotification,
  formatNotification
} from '../../../utils/formatNotification';

export const NotificationMenu = () => {
  const dispatch = useDispatch();
  const newNotifications = useSelector(getNewNotifications);
  const viewedNotifications = useSelector(getViewedNotifications);

  const formattedNew: IFormattedNotification[] = useMemo(
    () => newNotifications.map((n) => ({ ...n, ...formatNotification(n) })),
    [newNotifications]
  );

  const formattedViewed: IFormattedNotification[] = useMemo(
    () => viewedNotifications.map((n) => ({ ...n, ...formatNotification(n) })),
    [viewedNotifications]
  );

  const isNewEmpty = formattedNew.length === 0;
  const isViewedEmpty = formattedViewed.length === 0;

  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <div className={styles.title_section}>
          <Title tag='h3'>Новые уведомления</Title>
          {!isNewEmpty && (
            <Title
              tag='h5'
              color='accentColorDark'
              extraClassName={styles.action}
              onClick={() => dispatch(viewAllNotifications())}
            >
              Прочитать все
            </Title>
          )}
        </div>
        {isNewEmpty ? (
          <div className={styles.empty_container}>
            <Text tag='span' size='main' color='tertiaryColorDark'>
              Нет новых уведомлений
            </Text>
          </div>
        ) : (
          <ul className={styles.list}>
            {formattedNew.map((notification) => (
              <li
                key={notification.id}
                className={styles.notification_container}
              >
                <div className={styles.notification}>
                  <Lightbulb className={styles.icon} />
                  <div className={styles.message_block}>
                    <Text tag='p' size='main'>
                      {notification.message}
                    </Text>
                    <Text tag='p' size='details'>
                      Перейдите в профиль, чтобы обсудить детали
                    </Text>
                  </div>
                  <div className={styles.date}>
                    <Text tag='span' size='main' color='tertiaryColorDark'>
                      {notification.date}
                    </Text>
                  </div>
                </div>
                <div className={styles.button_container}>
                  <Button>Перейти</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.title_section}>
          <Title tag='h3'>Просмотренные</Title>
          {!isViewedEmpty && (
            <Title
              tag='h5'
              color='accentColorDark'
              extraClassName={styles.action}
              onClick={() => dispatch(removeViewedNotifications())}
            >
              Очистить
            </Title>
          )}
        </div>
        {isViewedEmpty ? (
          <div className={styles.empty_container}>
            <Text tag='span' size='main' color='tertiaryColorDark'>
              Нет просмотренных уведомлений
            </Text>
          </div>
        ) : (
          <ul className={styles.list}>
            {formattedViewed.map((notification) => (
              <li key={notification.id} className={styles.notification}>
                <Lightbulb className={styles.icon} />
                <div className={styles.message_block}>
                  <Text tag='p' size='main'>
                    {notification.message}
                  </Text>
                  <Text tag='p' size='details'>
                    Перейдите в профиль, чтобы обсудить детали
                  </Text>
                </div>
                <div className={styles.date}>
                  <Text tag='span' size='main' color='tertiaryColorDark'>
                    {notification.date}
                  </Text>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationMenu;
