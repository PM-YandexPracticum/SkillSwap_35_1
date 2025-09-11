import { useEffect } from "react";

export const useClickEsc = (onClose: () => void) => {
  const handleEsc = (e: KeyboardEvent) => {
    e.key === 'Escape' && onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [onClose])
};