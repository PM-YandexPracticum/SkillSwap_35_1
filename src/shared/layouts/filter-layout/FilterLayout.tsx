/* eslint-disable import-x/prefer-default-export */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { IFilters } from '@shared-types/IFilters';
import { useEffect } from 'react';
import styles from './FilterLayout.module.scss';
import { FilterPanel } from '../../../widgets/filter/filter-panel/FilterPanel';
import { useDispatch, useSelector } from '../../../app/providers/store/store';
import {
  setFilters,
  clearAllFilters,
  getFilters,
  initialState
} from '../../../entities/skill/model/skills-slice/skillsSlice';

export const FilterLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const filtersInitialState = initialState.filters;

  const onFilterchange = (newFilters: IFilters) => {
    dispatch(setFilters(newFilters));
  };

  const onFiltersReset = () => {
    dispatch(clearAllFilters());
  };

  useEffect(() => {
    const isFiltersInitial =
      JSON.stringify(filters) === JSON.stringify(filtersInitialState);
    const path = location.pathname;

    if (!isFiltersInitial && path !== '/filter')
      navigate('filter', { replace: true });
    if (isFiltersInitial && path !== '/') navigate('/', { replace: true });
  }, [filters, filtersInitialState, navigate, location]);

  return (
    <div className={styles.main}>
      <aside className={styles.filterPanel}>
        <FilterPanel
          filters={filters}
          onChange={onFilterchange}
          onReset={onFiltersReset}
        />
      </aside>
      <div className={styles.cardsContainer}>
        <Outlet />
      </div>
    </div>
  );
};
