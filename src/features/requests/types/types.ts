import { type IUserPublic } from '@entities/user/model/types/types'

export interface INotification {
  id: string;
  type: 'request' | 'accept' | 'decline';
  date: string;
  from: IUserPublic;
  to: IUserPublic;
}

export interface INotificationList {
    new: INotification[];
    viewed: INotification[];
}