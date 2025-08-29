/* eslint-disable no-nested-ternary */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { type Option } from '@ui/dropdown/types';

interface UseDropdownProps {
  value: string | string[];
  multiple?: boolean;
  options: Option[];
  onChange: (val: string | string[]) => void;
}

// управление логикой дропдауна
const useDropdown = ({
  value,
  multiple = false,
  options,
  onChange
}: UseDropdownProps) => {
  // состояния
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Нормализация value в массив выбранных значений
  const selectedValues = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value]
  );

  // Фильтрация опций по поиску
  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? options.filter((o) => o.label.toLowerCase().startsWith(q))
      : options;
  }, [options, search]);

  // Выбор опции
  const setOption = useCallback(
    (val: string) => {
      if (multiple) {
        const next = selectedValues.includes(val)
          ? selectedValues.filter((v) => v !== val)
          : [...selectedValues, val];
        onChange(next);
      } else {
        onChange(val);
        setActive(false);
        setSearch('');
        setHighlightedIndex(null);
      }
    },
    [multiple, onChange, selectedValues]
  );

  // Очистка поиска
  const clearSearch = useCallback(() => setSearch(''), []);

  // Обработка клавиатуры (навигация стрелками, enter, esc)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, filteredOptions.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === null ? filteredOptions.length - 1 : Math.max(prev - 1, 0)
        );
      } else if (e.key === 'Enter' && highlightedIndex !== null) {
        e.preventDefault();
        setOption(filteredOptions[highlightedIndex].value);
      } else if (e.key === 'Escape') {
        setActive(false);
      }
    },
    [filteredOptions, highlightedIndex, setOption]
  );

  // Сброс выделения при закрытии дропдауна
  useEffect(() => {
    if (!active) setHighlightedIndex(null);
  }, [active]);

  // Корректировка индекса выделения при изменении списка опций
  useEffect(() => {
    if (highlightedIndex === null) {
      if (filteredOptions.length > 0) setHighlightedIndex(0);
      return;
    }

    if (highlightedIndex >= filteredOptions.length) {
      setHighlightedIndex(filteredOptions.length - 1);
    }
  }, [filteredOptions, highlightedIndex]);

  return {
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
  };
};

export default useDropdown;
