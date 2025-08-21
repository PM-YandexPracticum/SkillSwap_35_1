import type { FC } from 'react';
import type { CardSectionProps } from '@components/card-section/types';
import { Title } from '@ui/title';
import Button from '@ui/button/Button';
import { SkillCard } from '../../../widgets/skill-card';
import styles from './CardSection.module.scss';
import IconRowRight from '../../../shared/assets/icons/ui/chevron-right.svg?react';

export const CardSection: FC<CardSectionProps> = ({
  data,
  linkSeeAll,
  title,
  maxVisible = 3
}) => {
  const visibleData = data.slice(0, maxVisible);
  const hasMoreData = data.length > maxVisible;

  const onClick = () => {
    console.log({ linkSeeAll });
    // здесь будет роутинг с опредленным путем
  };

  return (
    <section className={styles.section}>
      <div className={styles.section__alignTop}>
        <Title as={'h2'}> {title} </Title>
        {hasMoreData && (
          <div className={styles.section__wrapperBtn}>
            <Button
              onClick={onClick}
              variant='tertiary'
              style={{ padding: '24px' }}
            >
              смотреть еще
              <IconRowRight />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.cards}>
        {visibleData.map((card) => (
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
    </section>
  );
};
