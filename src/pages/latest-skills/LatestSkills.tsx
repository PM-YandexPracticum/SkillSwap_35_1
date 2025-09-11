import { useSelector } from '../../app/providers/store/store';
import { getNewSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { InfiniteGrid } from '@ui/infinite-grid';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { useFetchMoreSkills } from '../../shared/hooks/useFetchMoreSkills';

export const LatestSkills = () => {

  const newSkills = useSelector(getNewSkills);
  const { hasMore, fetchMoreData } = useFetchMoreSkills();

  return (
    <div className={styles.main}>
      <InfiniteGrid
        title='Новое'
        data={newSkills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
