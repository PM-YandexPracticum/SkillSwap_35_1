import type { Option } from '@ui/dropdown/types';

/**
 * Пропсы для компонента DropdownList
 * options — список опций для отображения
 * selectedValues — массив выбранных значений (для множественного выбора)
 * highlightedIndex — индекс подсвеченного элемента (для клавиатурной навигации)
 * multiple — флаг множественного выбора
 * onSelect — обработчик выбора опции
 * onKeyDown — обработчик нажатия клавиш (для клавиатурной навигации по списку)
 */

export interface DropdownListProps {
  options: Option[];
  selectedValues: string[];
  highlightedIndex: number | null;
  multiple: boolean;
  onSelect: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
