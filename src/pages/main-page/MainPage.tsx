import { InfiniteGrid } from '@ui/infinite-grid';
import { useSelector } from '../../app/providers/store/store';
import { getNewSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { getPopularSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { CardSection } from '../../shared/ui/card-section';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { useFetchMoreSkills } from '../../shared/hooks/useFetchMoreSkills';

export const MainPage = () => {
  
  const popularSkills = useSelector(getPopularSkills);
  const newSkills = useSelector(getNewSkills);
  const { skills, hasMore, fetchMoreData } = useFetchMoreSkills();

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
