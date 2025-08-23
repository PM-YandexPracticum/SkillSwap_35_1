/* eslint-disable consistent-return */
/* eslint-disable import-x/prefer-default-export */
import IconChevronDown from '@icons/ui/chevron-down.svg?react';
import { useCallback, useLayoutEffect, useRef, useState, type FC } from 'react';
import styles from './checkboxAccordion.module.scss';
import type { CheckboxAccordionProps } from './type';
import { Checkbox } from '../checkbox/checkbox';
import { Text } from '../text/Text';

export const CheckboxAccordion: FC<CheckboxAccordionProps> = ({
  groupName,
  items,
  onItemsChange
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;

    if (isAccordionOpen) {
      setIsListOpen(true);

      if (list) {
        const height = list?.scrollHeight;

        list.style.maxHeight = '0px';
        list.style.transition = 'max-height 0.4s ease';

        requestAnimationFrame(() => {
          list.style.maxHeight = `${height}px`;
        });
      }
    } else if (isListOpen && list) {
      const handleTransitionEnd = () => {
        setIsListOpen(false);
      };

      list.addEventListener('transitionend', handleTransitionEnd);

      requestAnimationFrame(() => {
        list.style.maxHeight = `0px`;
      });

      return () => {
        list.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [isAccordionOpen, isListOpen]);

  const isAllChecked =
    items.length > 0 && items.every((item) => item.checked === true);
  const isSomeChecked = items.some((item) => item.checked === true);

  const toggleMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('label')) return;

    setIsAccordionOpen((prev) => !prev);
  };

  const handleToggleChange = useCallback(() => {
    if (isAllChecked || isSomeChecked) {
      const updatedList = items.map((item) => ({ ...item, checked: false }));
      onItemsChange?.(updatedList);
    } else {
      const updatedList = items.map((item) => ({ ...item, checked: true }));
      onItemsChange?.(updatedList);
    }
  }, [items, isAllChecked, isSomeChecked, onItemsChange]);

  const handleListItemChange = useCallback(
    (id: string) => {
      const updatedList = items.map((item) => {
        if (item.value === id) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return item;
      });

      onItemsChange?.(updatedList);
    },

    [items, onItemsChange]
  );

  return (
    <div className={styles.accordion}>
      <div className={styles.wrapper}>
        <Checkbox
          checked={isSomeChecked}
          variant='minus'
          onChange={handleToggleChange}
          ariaLabel={groupName}
        />
        <button
        type='button'
        className={`${styles.toggle} ${isAccordionOpen && styles.toggle_open}`}
        onClick={toggleMenu}
      >
        <Text as='span' size='main'>
          {groupName}
        </Text>
        <IconChevronDown className={styles.toggle__icon} />
      </button>
      </div>
      {isListOpen && (
        <ul className={styles.list} ref={listRef}>
          {items.map((item, index) => (
            <li key={`${groupName}-${index}`} className={styles.list__item}>
              <Checkbox
                checked={item.checked}
                name={groupName}
                value={item.value}
                onChange={() => {
                  handleListItemChange(item.value);
                }}
              >
                <Text as='span' size='main'>
                  {item.value}
                </Text>
              </Checkbox>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
