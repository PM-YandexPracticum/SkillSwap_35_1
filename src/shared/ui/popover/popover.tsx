import type { TPopoverProps } from "./types";
import style from './popover.module.scss';
import { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useRef } from 'react';
import { useClickEsc } from "../../hooks/useClickEsc";
import useClickOutside from "../../hooks/useClickOutside";
import { usePositionPopover } from "../../hooks/usePositionPopover";

export const Popover = ({isOpen, onClose, children, triggerRef, isRightAligned}: TPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  let activeRef = triggerRef; // ссылка на элемент вызывающий отображение поповера

  useEffect(() => {
    if (isOpen && activeRef.current && popoverRef.current) {

      const [top, left, right] = usePositionPopover(activeRef.current, popoverRef.current, isRightAligned);
      popoverRef.current.style.top = top;
      popoverRef.current.style.left = left;
      popoverRef.current.style.right = right;
    };
  }, [isOpen]);

  useClickEsc(onClose);
  useClickOutside(activeRef, onClose);

  return (
    <Transition in={isOpen} timeout={350} mountOnEnter unmountOnExit nodeRef={popoverRef}>
      {(state) => (
        <div ref={popoverRef} className={`${style.popover} ${style[`${state}`]}`} >{children}</div>
      )}
    </Transition>
  )
}