import type { Option } from '../types';

export interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isHighlighted: boolean;
  multiple: boolean;
  onSelect: (val: string) => void;
}
