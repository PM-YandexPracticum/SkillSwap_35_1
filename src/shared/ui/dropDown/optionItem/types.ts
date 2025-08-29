import type { Option } from '../types';

/**
 * Пропсы для компонента OptionItem
 * option — объект опции
 * isSelected — флаг, указывающий выбрана ли данная опция
 * isHighlighted — флаг, указывающий подсвечена ли опция (для клавиатурной навигации)
 * multiple — флаг множественного выбора (для отображения чекбокса)
 * onSelect — обработчик выбора опции (передает значение выбранной опции)
 */

export interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isHighlighted: boolean;
  multiple: boolean;
  onSelect: (val: string) => void;
}
