/* eslint-disable no-nested-ternary */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { type Option } from '@ui/dropDown/types';

interface UseDropdownProps {
  value: string | string[];
  multiple?: boolean;
  options: Option[];
  onChange: (val: string | string[]) => void;
}

// управления логикой дропдауна
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
  const [internalValues, setInternalValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  // Синхронизация с внешним value
  useEffect(() => {
    const newValues = Array.isArray(value) ? value : value ? [value] : [];
    setInternalValues(newValues);
  }, [value]);

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
        setInternalValues((prev) => {
          const next = prev.includes(val)
            ? prev.filter((v) => v !== val)
            : [...prev, val];
          onChange(next);
          return next;
        });
      } else {
        setInternalValues([val]);
        onChange(val);
        setActive(false);
        setSearch('');
      }
    },
    [multiple, onChange]
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

  // Сброс выделения при изменении фильтрованных опций
  useEffect(() => {
    setHighlightedIndex(null);
  }, [filteredOptions]);

  // Возвращаемые значения
  return {
    search,
    setSearch,
    active,
    setActive,
    highlightedIndex,
    selectedValues: internalValues,
    filteredOptions,
    setOption,
    clearSearch,
    handleKeyDown
  };
};

export default useDropdown;
