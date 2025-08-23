import { InfiniteGrid } from "@components/infinite-grid";
import styles from './MainPage.module.scss';
import { useDispatch, useSelector } from '../../app/services/store';
import { getMockSkills, getSearchQuery } from '../../app/services/slices/skillsSlice';
import { useMemo } from "react";

export const MainPage = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const searchQuery = useSelector(getSearchQuery);
  const dispatch = useDispatch();

  const filteredSkills = useMemo( () => { 
    return skills.filter((skill) => {
      if (searchQuery) {
        return skill.can.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true
  })}, [skills, searchQuery]);

  const title = searchQuery ? `Подходящие предложения: ${filteredSkills.length}` : 'Рекомендуем';

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
          title={title} 
          data={filteredSkills} 
          fetchData={fetchMoreData} 
          hasMore={hasMore} 
        />
      </div>
    </div>
  );
};
