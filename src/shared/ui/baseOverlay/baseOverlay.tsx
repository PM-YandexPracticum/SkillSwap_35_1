import React, { useEffect, useRef } from 'react';
import styles from './baseOverlay.module.scss';
import type { BaseOverlayProps } from './types';

const BaseOverlay: React.FC<BaseOverlayProps> = ({
  children,
  onClose,
  isOpen
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Управление фокусом и блокировка скролла
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousActive: HTMLElement | null =
      document.activeElement as HTMLElement;
    overlayRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      previousActive?.focus();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по клику вне и Esc
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClick(e: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayClassName = `${styles.baseOverlayWrapper} ${isOpen ? styles.open : ''}`;
  const contentClassName = `${styles.baseOverlay}`;

  return (
    <div className={overlayClassName}>
      <div
        role='dialog'
        aria-modal='true'
        ref={overlayRef}
        tabIndex={-1}
        className={contentClassName}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseOverlay;
