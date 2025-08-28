import type { Option } from '../types';

export interface DropdownListProps {
  options: Option[];
  selectedValues: string[];
  highlightedIndex: number | null;
  multiple: boolean;
  onSelect: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
