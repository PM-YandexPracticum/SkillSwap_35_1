import Avatar from '@ui/avatar/Avatar';
import { SkillTag } from '@ui/skillTag/skillTag';
import { Text } from '@ui/text/Text';
import Button from '@ui/button/Button';
import IconLike from '@icons/ui/like.svg?react';
import styles from './SkillCard.module.scss';
import type { SkillCardProps } from './types';

export const SkillCard = (props: SkillCardProps) => {
  const {
    userName,
    userCity,
    userDateofBirth,
    userSkillCategory,
    userSkillName,
    userPhotoUrl,
    skillsToLearn,
    onLikeClick,
    onDetailsClick
  } = props;

  function getAgeWithSuffix(birthDate: string): string {
    const d = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear() - (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate()) ? 1 : 0);

    const suffix = (age % 100 > 10 && age % 100 < 15) ? 'лет' :
                   (age % 10 === 1) ? 'год' :
                   (age % 10 >= 2 && age % 10 <= 4) ? 'года' : 'лет';

    return `${age} ${suffix}`;
}

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar src={userPhotoUrl} size='medium' />
        <div className={styles.user_info}>
          <p className={styles.user_name}>{userName}</p>
          <Text as='p' size='details'>{`${userCity}, ${getAgeWithSuffix(userDateofBirth)}`}</Text>
        </div>
        <div className={styles.like}>
          <IconLike onClick={onLikeClick} />
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.skill_section}>
          <Text as='div' size='main'>
            Может научить:
          </Text>
          <SkillTag name={userSkillName} category={userSkillCategory} />
        </div>
        <div className={styles.skill_section}>
          <Text as='div' size='main'>
            Хочет научиться:
          </Text>
          <div className={styles.skills_wrapper}>
            {skillsToLearn.length > 0 && (
              <SkillTag
                name={skillsToLearn[0].subcategory}
                category={skillsToLearn[0].category}
              />
            )}
            {skillsToLearn.length > 1 && (
              <SkillTag
                name={skillsToLearn[1].subcategory}
                category={skillsToLearn[1].category}
              />
            )}
            {skillsToLearn.length > 2 && (
              <SkillTag
                name={`+${skillsToLearn.length - 2}`}
                category='other'
              />
            )}
          </div>
        </div>
      </div>
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  );
};
