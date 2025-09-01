import React from 'react';

/**
 * Пропсы для компонента Button
 * children — содержимое кнопки
 * variant — вариант оформления кнопки
 * onClick — обработчик клика
 * disabled — флаг отключённой кнопки
 * htmlType — HTML-атрибут type кнопки
 * style — дополнительные inline-стили
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  htmlType?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}
