
import { useEffect } from 'react';

// закрытие по клику вне элемента
const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ref, handler]);
};

export default useClickOutside;

