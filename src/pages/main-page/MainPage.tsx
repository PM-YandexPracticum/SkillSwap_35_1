import { InfiniteGrid } from "@components/infinite-grid";
import styles from './MainPage.module.scss';
import { useDispatch, useSelector } from '../../app/services/store';
import { getMockSkills } from '../../app/services/slices/skillsSlice';

export const MainPage = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(getMockSkills(skills.length));
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.filterPanel}>Заглушка</div>
      <div className={styles.cardsContainer}>
        <InfiniteGrid 
          title="Рекомендуем" 
          data={skills} 
          fetchData={fetchMoreData} 
          hasMore={hasMore} 
        />
      </div>
    </main>
  );
};
