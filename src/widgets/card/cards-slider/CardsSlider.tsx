/* eslint-disable arrow-body-style */
/* eslint-disable import-x/prefer-default-export */
import { Title } from '@ui/title';
import { Slider } from '@ui/slider';
import styles from './CardsSlider.module.scss';
import type { CardsSliderProps } from './types';
import { SkillCard } from '../../../widgets/card/skill-card';

export const CardsSlider = ({ title, skillsList }: CardsSliderProps) => {
  return (
    <div className={styles.section}>
      <Title tag='h2'>{title}</Title>

      <Slider
        data={skillsList}
        getItemId={(skill) => skill.id}
        renderItem={(skill) => (
          <SkillCard
            userName={skill.name}
            userCity={skill.city}
            userDateofBirth={skill.dateOfBirth}
            userSkillCategory={skill.can.category}
            userSkillName={skill.can.title}
            userPhotoUrl={skill.image}
            skillsToLearn={skill.want}
          />
        )}
      />
    </div>
  );
};
