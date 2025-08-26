import { type FC, useEffect } from 'react';
import Button from '@ui/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import IconClose from '@icons/ui/cross.svg?react';
import {
  getFilters,
  updateFilters,
  initialState
} from '../../../app/services/slices/skillsSlice';
import type { IFilters } from '../../../shared/types/types';
import styles from './TopFilterBar.module.scss';

export const TopFilterBar: FC = () => {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const handleRemoveFilter = (filterType: keyof IFilters, value?: string) => {
    switch (filterType) {
      case 'gender':
        dispatch(updateFilters({ gender: 'Не имеет значения' }));
        break;

      case 'searchTarget':
        dispatch(updateFilters({ searchTarget: 'Всё' }));
        break;

      case 'subcategories':
        if (value) {
          const updatedSubcategories = filters.subcategories.filter(
            (item) => item !== value
          );
          dispatch(updateFilters({ subcategories: updatedSubcategories }));
        }
        break;

      case 'cities':
        if (value) {
          const updatedCities = filters.cities.filter((item) => item !== value);
          dispatch(updateFilters({ cities: updatedCities }));
        }
        break;

      default:
        break;
    }
  };

  // Массив всех активных фильтров для единообразного рендеринга
  const filterItems = [
    // Подкатегории
    ...filters.subcategories.map((value) => ({
      type: 'subcategories' as const,
      value,
      label: value
    })),

    // Города
    ...filters.cities.map((value) => ({
      type: 'cities' as const,
      value,
      label: value
    })),

    // Пол
    ...(filters.gender !== 'Не имеет значения'
      ? [
          {
            type: 'gender' as const,
            value: filters.gender,
            label: filters.gender
          }
        ]
      : []),

    // Цель поиска
    ...(filters.searchTarget !== 'Всё'
      ? [
          {
            type: 'searchTarget' as const,
            value: filters.searchTarget,
            label: filters.searchTarget
          }
        ]
      : [])
  ];

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const areFiltersApplied =
      JSON.stringify(filters) !== JSON.stringify(initialState.filters);


  return (
    <div className={areFiltersApplied ? styles.container : styles.container_invisible}>
      {filterItems.map((filter) => (
        <Button
          key={`${filter.type}-${filter.value}`}
          variant={'tertiary'}
          onClick={() => handleRemoveFilter(filter.type, filter.value)}
        >
          {filter.label} <IconClose />
        </Button>
      ))}
    </div>
  );
};
