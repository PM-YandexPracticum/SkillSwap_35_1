import React, { useCallback } from 'react';
import { Checkbox } from '@ui/checkbox/checkbox';
import type { OptionItemProps } from './types';
import styles from '../dropDown.module.scss';

const OptionItem = React.memo(
  ({
    option,
    isSelected,
    multiple,
    isHighlighted,
    onSelect
  }: OptionItemProps) => {
    // для обработчика клика
    const handleClick = useCallback(() => {
      onSelect(option.value);
    }, [onSelect, option.value]);

    // для обработчика клавиатуры
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(option.value);
          e.stopPropagation();
        }
      },
      [onSelect, option.value]
    );

    return (
      <div
        role='option'
        tabIndex={0}
        className={`${styles.option} ${isSelected ? styles.selected : ''} ${isHighlighted ? styles.highlighted : ''}`}
        aria-selected={isSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {multiple && <Checkbox checked={isSelected} onChange={handleClick} />}
        {option.label}
      </div>
    );
  }
);

OptionItem.displayName = 'OptionItem';

export default OptionItem;
