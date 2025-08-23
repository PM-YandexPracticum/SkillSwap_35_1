import { InfiniteGrid } from "@components/infinite-grid";
import styles from './MainPage.module.scss';
import { useDispatch, useSelector } from '../../app/services/store';
import { getMockSkills, getFilteredSkills } from '../../app/services/slices/skillsSlice';

export const MainPage = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const filteredSkills = useSelector(getFilteredSkills);

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(getMockSkills(skills.length));
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.filterPanel}>Заглушка</div>
      <div className={styles.cardsContainer}>
        <InfiniteGrid 
          title="Рекомендуем" 
          data={filteredSkills} 
          fetchData={fetchMoreData} 
          hasMore={hasMore} 
        />
      </div>
    </div>
  );
};
