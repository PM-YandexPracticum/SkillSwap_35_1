/**
 * Пропсы для компонента DatePicker
 * selectedDate - текущая выбранная дата
 * onSelect - коллбек, который вызывается при выборе даты
 */

export interface DatePickerProps {
  selectedDate?: Date;
  onSelect?: (date: Date | undefined) => void;
  onBack?: () => void;
  onSave?: () => void;
  placeholder?: string;
  isOpen?: boolean;
}
