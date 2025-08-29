/**
 * Пропсы для компонента Dropdown
 * options — список опций для выбора
 * value — выбранное значение
 * multiple — включает режим множественного выбора (для чекбоксов)
 * label — подпись к полю
 * placeholder — текст-подсказка внутри списка
 * error — текст ошибки (например, "Поле обязательно")
 * onChange — обработчик изменения значения
 */

export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  value: string | string[];
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  onChange: (val: string | string[]) => void;
}
