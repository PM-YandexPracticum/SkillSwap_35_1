import { InfiniteGrid } from '@ui/infinite-grid';
import { TopFilterBar } from '../../widgets/filter/top-filter-bar';
import { useSelector } from '../../app/providers/store/store';
import { getFilteredSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
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
