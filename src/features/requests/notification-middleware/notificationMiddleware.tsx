import { type Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { sendRequest, declineRequest, acceptRequest } from '@entities/user/model/user-slice/userSliсe';
import { formatNotification } from '../../../utils/formatNotification';
import type { INotification } from '../types/types';
import { Notification } from '@ui/notification/notification';
import styles from './toast.module.scss';

export const notificationMiddleware: Middleware = () => (next: any) => (action: any) => {
  const fulfilledActions = [
    sendRequest.fulfilled.type,
    declineRequest.fulfilled.type,
    acceptRequest.fulfilled.type,
  ];

  if (fulfilledActions.includes(action.type)) {
    const notification = action.payload as INotification;
    const { message } = formatNotification(notification);

    toast(({ closeToast }) => (
  <Notification
    text={message}
    onClose={closeToast}
  />
),
  {
    closeButton: false,
    className: styles.toast,
    hideProgressBar: true,
  }
);
  }

  return next(action);
};
