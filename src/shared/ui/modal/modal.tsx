import type { TModalProps } from "./types";
import style from './modal.module.scss';
import { memo, useRef } from "react";
import ReactDOM from 'react-dom';
import { Transition } from "react-transition-group";
import { useClickEsc } from "../../hooks/useClickEsc";

const modalRoot = document.getElementById('modals');

export const Modal = memo(({ isOpen, onClose, children }: TModalProps) => {
  const nodeRef = useRef(null);

  useClickEsc(onClose);

  return ReactDOM.createPortal(
    <Transition in={isOpen} timeout={350} mountOnEnter unmountOnExit nodeRef={nodeRef}>
      {(state) => (
        <div ref={nodeRef} className={`${style.overlay} ${style[`${state}`]}`} onClick={onClose}>
          <div className={style.modal} onClick={(event) => event.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </Transition>,
    modalRoot as HTMLDivElement
  )
});