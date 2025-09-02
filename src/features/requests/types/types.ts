export interface INotification {
    id: string;
    type: 'request' | 'accept' | 'decline';
    date: string;
    from: string;
    to: string;
}

export interface INotificationList {
    new: INotification[];
    viewed: INotification[];
}