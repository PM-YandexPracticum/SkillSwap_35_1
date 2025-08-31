import type { ReactNode } from 'react';

export interface ExpendableMenuProps {
  /** Любые элементы, которые нужно отрисовать сверху вниз */
  children: ReactNode | ReactNode[];
  /** Сколько элементов показывать в свернутом состоянии */
  maxCount?: number;
  /** Текст кнопки в свернутом состоянии (например, "Все города") */
  collapsedLabel: string;
}
