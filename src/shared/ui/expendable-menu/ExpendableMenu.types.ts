import type { ReactNode } from "react";

export interface ExpendableMenuProps {
  /** Элементы меню */
  items: ReactNode[];
  /** Сколько элементов показывать изначально */
  visibleCount?: number;
  /** Подпись кнопки при свернутом меню (например, "Все категории") */
  collapsedLabel: string;
}
