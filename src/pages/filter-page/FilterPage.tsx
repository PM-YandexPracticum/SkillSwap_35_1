import { InfiniteGrid } from '@components/infinite-grid';
import { TopFilterBar } from '../../widgets/filter/top-filter-bar';
import { useSelector } from '../../app/services/store';
import { getFilteredSkills } from '../../app/services/slices/skillsSlice';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';
import styles from '../../shared/styles/skill-list/skillList.module.scss';

export const FilterPage = () => {
  const filteredSkills = useSelector(getFilteredSkills);
  const { hasMore, fetchMoreData } = fetchMoreSkills();

  return (
    <div className={styles.main}>
      <TopFilterBar />
      <InfiniteGrid
        title={`Подходящие предложения: ${filteredSkills.length}`}
        data={filteredSkills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
