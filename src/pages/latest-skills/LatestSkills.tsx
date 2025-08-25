import { useSelector } from '../../app/services/store';
import { getNewSkills } from '../../app/services/slices/skillsSlice';
import { InfiniteGrid } from '@components/infinite-grid';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';

export const LatestSkills = () => {

  const newSkills = useSelector(getNewSkills);
  const { hasMore, fetchMoreData } = fetchMoreSkills();

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
