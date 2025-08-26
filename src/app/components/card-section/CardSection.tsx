import { type FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CardSectionProps } from '@components/card-section/types';
import { Title } from '@ui/title';
import Button from '@ui/button/Button';
import { SkillCard } from '../../../widgets/skill-card';
import styles from './CardSection.module.scss';
import IconRowRight from '../../../shared/assets/icons/ui/chevron-right.svg?react';

export const CardSection: FC<CardSectionProps> = ({
  data,
  linkSeeAll,
  title
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length);

  useEffect(() => {
    const updateVisible = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = 324;
      const gap = 24;

      const cardsThatFit = Math.floor(
        (containerWidth + gap) / (cardWidth + gap)
      );
      setVisibleCount(Math.max(1, Math.min(cardsThatFit, data.length)));
    };

    updateVisible();

    const resizeObserver = new ResizeObserver(updateVisible);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [data]);

  const visibleData = data.slice(0, visibleCount);
  const hasMoreData = visibleCount < data.length;

  const onClick = () => {
    if (linkSeeAll) navigate(linkSeeAll);
  };

  return (
    <section className={styles.section}>
      <div className={styles.section__alignTop}>
        <Title as='h2'>{title}</Title>
        {hasMoreData && (
          <div className={styles.section__wrapperBtn}>
            <Button onClick={onClick} variant='tertiary'>
              Смотреть все
              <IconRowRight className={styles.iconBtn} />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.cards} ref={containerRef}>
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
