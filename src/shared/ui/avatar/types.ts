import type { FC, SVGProps } from 'react';

/**
 * Пропсы для компонента Avatar
 * src — путь к изображению аватара
 * alt — альтернативный текст для изображения
 * size — размер аватара
 * buttonIcon — иконка с кнопкой внутри аватара
 * onButtonClick — обработчик клика по кнопке
 */

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  buttonIcon?: FC<SVGProps<SVGSVGElement>>;
  onButtonClick?: () => void;
}
