/* eslint-disable import-x/prefer-default-export */
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '@ui/title/Title';
import { Preloader } from '@ui/preloader';
import type { InfiniteGridProps } from './types';
import { SkillCard } from '../../../widgets/skill-card';
import styles from './Infinite.module.scss';
import { useDispatch, useSelector } from '../../services/store';
import { getMockSkills } from '../../services/slices/skillsSlice';

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { skills, hasMore, loading } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getMockSkills(0));
  }, [dispatch]);

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(getMockSkills(skills.length));
    }
  };

  return (
    <div className={styles.infinite__grid}>
      <Title as='h2'> {title} </Title>
      <InfiniteScroll
        dataLength={skills.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Preloader />}
        scrollThreshold={0.8}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.infinite__grid__container}>
          {skills.map((card) => (
            <SkillCard
              key={card.id}
              userName={card.name}
              userCity={card.city}
              userDateofBirth={card.dateOfBirth}
              userSkillCategory={card.can.category}
              userSkillName={card.can.title}
              userPhotoUrl={card.image}
              skillsToLearn={card.want}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
