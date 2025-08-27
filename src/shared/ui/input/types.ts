/**
 * Пропсы для компонента Input
 *
 * value — текущее значение инпута
 * type — тип инпута
 * inputSize - размер инпута
 * label — подпись к полю ввода
 * placeholder — текст-подсказка внутри инпута
 * icon — иконка справа внутри инпута
 * onIconClick — обработчик клика по иконке
 * status — состояние валидации
 * message — сообщение под инпутом (ошибка или подсказка)
 * onChange — обработчик изменения значения инпута
 * onFocus — обработчик фокуса на инпуте
 * style — дополнительные inline-стили
 * multiline — если true, инпут становится многострочным (textarea)
 * rows — количество строк для многострочного инпута
 */

export interface InputProps {
  value: string;
  type?: 'text' | 'email' | 'password' | 'search';
  inputSize?: 'small' | 'medium' | 'large' | 'xlarge';
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  status?: 'success' | 'error';
  message?: string;
  onChange?(e: React.ChangeEvent): void;
  onFocus?(e: React.FocusEvent): void;
  style?: React.CSSProperties;
  multiline?: boolean;
  rows?: number;
}
