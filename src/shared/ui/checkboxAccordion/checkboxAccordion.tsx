/* eslint-disable import-x/prefer-default-export */
import IconChevronDown from '@icons/ui/chevron-down.svg?react';
import IconChevronUp from '@icons/ui/chevron-up.svg?react';
import { useCallback, useState, type FC } from 'react';
import styles from './checkboxAccordion.module.scss';
import type { CheckboxAccordionProps } from './type';
import { Checkbox } from '../checkbox/checkbox';
import { Text } from '../text/Text';

export const CheckboxAccordion: FC<CheckboxAccordionProps> = ({
  label,
  items,
  onItemsChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isAllChecked =
    items.length > 0 && items.every((item) => item.checked === true);
  const isSomeChecked = items.some((item) => item.checked === true);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
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
        if (item.id === id) {
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
      <button
        type='button'
        className={styles.toggle}
        onClick={toggleMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Checkbox
          checked={isSomeChecked}
          variant='minus'
          onChange={handleToggleChange}
        >
          <Text as='span' size='main'>
            {label}
          </Text>
        </Checkbox>
        {isHovered && !isOpen ? <IconChevronDown /> : ''}
        {isOpen && <IconChevronUp />}
      </button>
      {isOpen && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <Checkbox
                checked={item.checked}
                onChange={() => {
                  handleListItemChange(item.id);
                }}
              >
                <Text as='span' size='main'>
                  {item.label}
                </Text>
              </Checkbox>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
