/* eslint-disable import-x/prefer-default-export */
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '@ui/title/Title';
import { Preloader } from '@ui/preloader';
import type { InfiniteGridProps } from './types';
import { SkillCard } from '../../../widgets/card/skill-card';
import styles from './Infinite.module.scss';
import Button from '@ui/button/Button';
import IconSort from '../../../shared/assets/icons/ui/sort.svg?react';

export const InfiniteGrid = ({ title, data, fetchData, hasMore, onClick }: InfiniteGridProps ) => {
  return (
    <div className={styles.infinite__grid}>
      <div className={styles.infinite__grid__header}>
        <Title tag='h2'>{title}</Title>
        {onClick && (
          <div>
            <Button variant='tertiary' onClick={onClick} >
              <IconSort></IconSort>
              Сначала новые
            </Button>
          </div>
        )}
      </div>
      
      {data && data.length > 0 && (
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
                id={card.id}
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
      )}
    </div>
  );
};
