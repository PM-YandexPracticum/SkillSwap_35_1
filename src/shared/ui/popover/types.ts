import type { ReactNode, RefObject } from "react";

export type TPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  triggerRef: RefObject<HTMLDivElement | null>; // ссылка на элемент вызывающий отображение поповера
  isRightAligned: boolean;
}