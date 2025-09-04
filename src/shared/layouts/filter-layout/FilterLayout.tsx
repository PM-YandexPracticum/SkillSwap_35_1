import { Outlet } from 'react-router-dom';
import styles from './FilterLayout.module.scss';
import { FilterPanel } from '../../../widgets/filter/filter-panel/FilterPanel';
import { useDispatch, useSelector } from '../../../app/providers/store/store';
import { setFilters, clearAllFilters, getFilters } from '../../../entities/skill/model/skills-slice/skillsSlice';
import type { IFilters } from '@shared-types/IFilters';

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