import { InfiniteGrid } from '@components/infinite-grid';
import styles from './MainPage.module.scss';
import { fetchMoreSkills } from '../../utils/fetchMoreSkills';

export const MainPage = () => {

  const { skills, hasMore, fetchMoreData } = fetchMoreSkills();

  return (
    <div className={styles.main}>
      <InfiniteGrid
        title='Рекомендуем'
        data={skills}
        fetchData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};
