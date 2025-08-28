import { useId, useRef, useCallback } from 'react';
import { InputText } from '@ui/input/Input';
import OpenIcon from '@icons/ui/chevron-down.svg?react';
import CloseIcon from '@icons/ui/chevron-up.svg?react';
import ClearIcon from '@icons/ui/cross.svg?react';
import DropdownList from './dropDownList/dropdownList';
import useClickOutside from '../../hooks/useClickOutside';
import useDropdown from '../../hooks/useDropdown';
import type { DropdownProps } from './types';
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

  // Для кастмного хука
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
  } = useDropdown({
    value,
    multiple,
    options,
    onChange
  });

  // Обработчик закрытия dropdown
  const handleCloseDropdown = useCallback(() => {
    setActive(false);
    inputRef.current?.focus();
  }, [setActive]);

  useClickOutside(containerRef, handleCloseDropdown);

  // Обработчики событий с колбеком
  const handleInputClick = useCallback(() => {
    setActive(true);
  }, [setActive]);

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

  // определение что показываем в инпуте
  const getDisplayValue = useCallback(() => {
    if (search) return search;
    if (!selectedValues.length) return '';
    if (multiple) return `Выбрано: ${selectedValues.length}`;
    return options.find((o) => o.value === selectedValues[0])?.label ?? '';
  }, [search, selectedValues, multiple, options]);

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
        value={getDisplayValue()}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        onClick={handleInputClick}
        style={{
          borderRadius: active
            ? 'var(--main-border-radius) var(--main-border-radius) 0 0'
            : 'var(--main-border-radius)',
          borderBottom: active
            ? '1px solid #E4E8DF'
            : '1px solid var(--tertiary-color-dark)'
        }}
        icon={
          search ? (
            <ClearIcon
              role='button'
              tabIndex={0}
              onClick={handleClear}
              style={{ cursor: 'pointer' }}
              aria-label='Очистить поиск'
            />
          ) : (
            // возможно лучше сделать отдельный компонент кнопки с иконками внутри
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

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Dropdown;
