import { Outlet } from 'react-router-dom';
import styles from './FilterLayout.module.scss';

export const FilterLayout = () => {
  return (
    <div className={styles.main}>
      <aside className={styles.filterPanel}>Заглушка</aside>
      <div className={styles.cardsContainer}>
        <Outlet />
      </div>
    </div>
  );
};
