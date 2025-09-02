import type { ReactNode } from 'react';

export interface OfferConfirmationProps {
  icon?: ReactNode; // Иконка сверху
  title: string; // Заголовок
  description: string; // Текст
  onEdit?: () => void; // Коллбэк при клике на кнопку
}
