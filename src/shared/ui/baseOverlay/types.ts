import React from 'react';

/**
 * Пропсы для компонента BaseOverlay
 * children — содержимое модалки
 * onClose — функция закрытия модалки
 * className — для кастомных стилей
 * isOpen — управление видимостью модалки
 */

export interface BaseOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}
