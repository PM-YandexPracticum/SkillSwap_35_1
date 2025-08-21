/* eslint-disable import-x/prefer-default-export */
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '@ui/title/Title';
import { Preloader } from '@ui/preloader';
import type { InfiniteGridProps } from './types';
import { SkillCard } from '../../../widgets/skill-card';
import styles from './Infinite.module.scss';

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({
  title,
  data,
  fetchData,
  hasMore
}) => {
  return (
    <div className={styles.infinite__grid}>
      <Title as='h2'> {title} </Title>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Preloader />}
        scrollThreshold={0.8}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.infinite__grid__container}>
          {data.map((card) => (
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
