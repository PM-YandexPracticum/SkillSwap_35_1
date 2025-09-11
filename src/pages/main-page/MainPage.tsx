
import { InfiniteGrid } from '@ui/infinite-grid';
import { useDispatch, useSelector } from '../../app/providers/store/store';
import { getNewSkills, getSearchResults, setSearchQuery } from '../../entities/skill/model/skills-slice/skillsSlice';
import { getPopularSkills } from '../../entities/skill/model/skills-slice/skillsSlice';
import { CardSection } from '../../shared/ui/card-section';
import styles from '../../shared/styles/skill-list/skillList.module.scss';
import { useFetchMoreSkills } from '../../shared/hooks/useFetchMoreSkills';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const MainPage = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const dispatch = useDispatch()
  const isSearching = searchQuery.trim().length > 0

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery))
  }, [searchQuery, dispatch])
  
  const popularSkills = useSelector(getPopularSkills);
  const newSkills = useSelector(getNewSkills);
  const { skills, hasMore, fetchMoreData } = useFetchMoreSkills();
  const searchSkills = useSelector(getSearchResults);

  return (
    <div className={styles.main}>
      {!isSearching ? (
        <>
          <CardSection data={popularSkills} title='Популярное' linkSeeAll='/popular' />
          <CardSection data={newSkills} title='Новое' linkSeeAll='/latest' />
          <InfiniteGrid
            title='Рекомендуем'
            data={skills}
            fetchData={fetchMoreData}
            hasMore={hasMore}
          />
        </>
      ) : (
        <InfiniteGrid
          title={`Подходящие предложения: ${searchSkills.length}`}
          data={searchSkills}
          fetchData={fetchMoreData}
          hasMore={hasMore}
        />
      )}
     
    </div>
  );
};
