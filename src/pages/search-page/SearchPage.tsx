import { InfiniteGrid } from '@ui/infinite-grid';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { useSelector } from '../../app/providers/store/store';
import { getSearchResults } from '../../entities/skill/model/skills-slice/skillsSlice';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';

export const SearchPage = () => {
  const filteredSkills = useSelector(getSearchResults);

  const { hasMore, fetchMoreData } = fetchMoreSkills();

  return (
    <div className={styles.main}>
      <InfiniteGrid
        title={`Подходящие предложения: ${filteredSkills.length}`}
        data={filteredSkills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
