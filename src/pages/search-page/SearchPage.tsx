import { InfiniteGrid } from '@ui/infinite-grid';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { useSelector } from '../../app/providers/store/store';
import { getSearchQuery, getSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';
import { useMemo } from 'react';

export const SearchPage = () => {
  const skills = useSelector(getSkills);
  const searchQuery = useSelector(getSearchQuery);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      if (searchQuery) {
        return skill.can.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [skills, searchQuery]);

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
