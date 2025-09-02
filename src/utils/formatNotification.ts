import { mockGetSkillById } from '../api/mockApi';
import { type INotification } from '../features/requests/types/types';

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) return 'сегодня';

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return 'вчера';

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export const formatNotification = async (
  notification: INotification
): Promise<{ message: string; date: string }> => {
  const user = await mockGetSkillById(notification.to);

  if (!user) {
    return {
      message: 'Пользователь не найден',
      date: formatDate(notification.date),
    };
  }

  let message = '';

  switch (notification.type) {
    case 'request': {
      if (user.gender === 'Мужской') {
        message = `${user.name} получил ваше предложение`;
      } else if (user.gender === 'Женский') {
        message = `${user.name} получила ваше предложение`;
      } else {
        message = `${user.name} получил(а) ваше предложение`;
      }
      break;
    }
    case 'accept':
      message = `Вы приняли предложение пользователя ${user.name}`;
      break;
    case 'decline':
      message = `Вы отвергли предложение пользователя ${user.name}`;
      break;
  }

  return {
    message,
    date: formatDate(notification.date),
  };
};
