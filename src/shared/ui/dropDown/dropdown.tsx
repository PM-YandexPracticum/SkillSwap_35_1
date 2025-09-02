/* eslint-disable no-nested-ternary */
import { useId, useRef, useCallback, useMemo } from 'react';
import { InputText } from '@ui/input/Input';
import OpenIcon from '@icons/ui/chevron-down.svg?react';
import CloseIcon from '@icons/ui/chevron-up.svg?react';
import ClearIcon from '@icons/ui/cross.svg?react';
import type { DropdownProps } from './types';
import DropdownList from './dropdown-list/DropdownList';
import useClickOutside from '../../hooks/useClickOutside';
import useDropdown from '../../hooks/useDropdown';
import styles from './dropDown.module.scss';

const Dropdown = ({
  options,
  value,
  multiple = false,
  placeholder,
  onChange,
  label,
  error
}: DropdownProps) => {
  const selectId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    search,
    setSearch,
    active,
    setActive,
    highlightedIndex,
    selectedValues,
    filteredOptions,
    setOption,
    clearSearch,
    handleKeyDown
  } = useDropdown({ value, multiple, options, onChange });

  useClickOutside(containerRef, () => {
    if (document.activeElement !== inputRef.current) setActive(false);
  });

  const handleInputClick = useCallback(() => setActive(true), [setActive]);

  const handleToggleDropdown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setActive((prev) => !prev);
    },
    [setActive]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      clearSearch();
    },
    [clearSearch]
  );

  const dynamicPlaceholder = useMemo(() => {
    if (!selectedValues || selectedValues.length === 0) return placeholder;

    if (multiple) {
      // Считаем только уникальные значения
      const uniqueValues = Array.from(new Set(selectedValues));
      return `Выбрано: ${uniqueValues.length}`;
    }

    // Для single
    return (
      options.find((o) => o.value === selectedValues[0])?.label ?? placeholder
    );
  }, [selectedValues, multiple, options, placeholder]);

  return (
    <div
      className={`${styles.container} ${!multiple ? styles.single : ''}`}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={selectId} className={styles.selectLabel}>
          {label}
        </label>
      )}

      <InputText
        ref={inputRef}
        inputSize='full'
        value={search}
        placeholder={dynamicPlaceholder}
        onChange={(e) => setSearch(e.target.value)}
        onClick={handleInputClick}
        status={error ? 'error' : undefined}
        message={error}
        style={{
          borderRadius: active
            ? 'var(--main-border-radius) var(--main-border-radius) 0 0'
            : 'var(--main-border-radius)',
          borderBottom: error
            ? '1px solid var(--color-error)'
            : active
              ? '1px solid var(--accent-color-lightest)'
              : '1px solid var(--tertiary-color-dark)'
        }}
        icon={
          search ? (
            <ClearIcon
              role='button'
              tabIndex={0}
              onClick={handleClear}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <button
              type='button'
              onClick={handleToggleDropdown}
              aria-label={active ? 'Закрыть список' : 'Открыть список'}
              className={styles.iconButton}
              style={{ cursor: 'pointer' }}
            >
              {active ? <CloseIcon /> : <OpenIcon />}
            </button>
          )
        }
      />

      {active && (
        <DropdownList
          options={filteredOptions}
          selectedValues={selectedValues}
          highlightedIndex={highlightedIndex}
          multiple={multiple}
          onSelect={setOption}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default Dropdown;
