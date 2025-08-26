import { Outlet } from 'react-router-dom';
import styles from './FilterLayout.module.scss';
import { FilterPanel } from '../../filter-panel/FilterPanel';
import { useDispatch, useSelector } from '../../../app/services/store';
import { setFilters, clearAllFilters, getFilters } from '../../../app/services/slices/skillsSlice';
import type { IFilters } from '@shared-types/types';

export const FilterLayout = () => {

  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const onFilterchange = (newFilters: IFilters) => dispatch(setFilters(newFilters));
  const onFiltersReset = () => dispatch(clearAllFilters());


  return (
    <div className={styles.main}>
      <aside className={styles.filterPanel}><FilterPanel filters={filters} onChange={onFilterchange} onReset={onFiltersReset}/></aside>
      <div className={styles.cardsContainer}>
        <Outlet />
      </div>
    </div>
  );
};