import { InfiniteGrid } from '@components/infinite-grid';
import { useSelector } from '../../app/services/store';
import { getNewSkills } from '../../app/services/slices/skillsSlice';
import { getPopularSkills } from '../../app/services/slices/skillsSlice';
import { CardSection } from '../../app/components/card-section';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';

export const MainPage = () => {
  
  const popularSkills = useSelector(getPopularSkills);
  const newSkills = useSelector(getNewSkills);
  const { skills, hasMore, fetchMoreData } = fetchMoreSkills();

  return (
    <div className={styles.main}>
      <CardSection data={popularSkills} title='Популярное' linkSeeAll='/popular' />
      <CardSection data={newSkills} title='Новое' linkSeeAll='/latest' />
      <InfiniteGrid
        title='Рекомендуем'
        data={skills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
