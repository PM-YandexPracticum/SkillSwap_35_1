import type { ReactNode } from 'react';

export interface SliderProps<T> {
  data?: T[];
  renderItem: (item: T) => ReactNode;
  getItemId: (item: T) => string;
  onReachEnd?: () => void;
}
