import React, { useEffect, useRef, useCallback } from 'react';
import OptionItem from '../option-item/OptionItem';
import type { DropdownListProps } from './types';
import styles from './dropdownList.module.scss';

const DropdownList = React.memo(
  ({
    options,
    selectedValues,
    highlightedIndex,
    multiple,
    onSelect,
    onKeyDown
  }: DropdownListProps) => {
    const listRef = useRef<HTMLDivElement>(null);

    const scrollToHighlighted = useCallback(() => {
      if (highlightedIndex === null || !listRef.current) return;

      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (!item) return;

      item.scrollIntoView({
        block: 'nearest',
        behavior: 'auto'
      });
    }, [highlightedIndex]);

    useEffect(() => {
      scrollToHighlighted();
    }, [scrollToHighlighted]);

    const handleSelect = useCallback(
      (value: string) => {
        onSelect(value);
      },
      [onSelect]
    );

    return (
      <div
        className={styles.options}
        role='listbox'
        aria-multiselectable={multiple}
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={listRef}
      >
        {options.map((opt, index) => (
          <OptionItem
            key={opt.value}
            option={opt}
            isSelected={selectedValues.includes(opt.value)}
            isHighlighted={highlightedIndex === index}
            multiple={multiple}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  }
);

DropdownList.displayName = 'DropdownList';

export default DropdownList;
