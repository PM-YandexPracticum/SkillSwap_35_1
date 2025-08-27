import { useSelector } from '../../app/providers/store/store';
import { getPopularSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { InfiniteGrid } from '@ui/infinite-grid';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';

export const PopularSkills = () => {

  const popularSkills = useSelector(getPopularSkills);
  const { hasMore, fetchMoreData } = fetchMoreSkills();

  return (
    <div className={styles.main}>
      <InfiniteGrid
        title='Популярное'
        data={popularSkills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
