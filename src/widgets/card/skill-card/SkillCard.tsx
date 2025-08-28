import { useState } from 'react';
import Avatar from '@ui/avatar/Avatar';
import { SkillTag } from '@ui/skillTag/skillTag';
import { Text } from '@ui/text/Text';
import Button from '@ui/button/Button';
import { LikeButton } from '@ui/likeButton';
import styles from './SkillCard.module.scss';
import type { SkillCardProps } from './types';
import { getAgeWithSuffix } from '../../../utils/getAgeWithSuffix';

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

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar src={userPhotoUrl} size='medium' />
        <div className={styles.user_info}>
          <p className={styles.user_name}>{userName}</p>
          <Text
            tag='p'
            size='details'
          >{`${userCity}, ${getAgeWithSuffix(userDateofBirth)}`}</Text>
        </div>
        <div className={styles.like}>
          <LikeButton
            onClick={() => {
              setLiked((prev) => !prev);
              onLikeClick?.();
            }}
            liked={liked}
          />
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.skill_section}>
          <Text tag='div' size='main'>
            Может научить:
          </Text>
          <SkillTag name={userSkillName} category={userSkillCategory} />
        </div>
        <div className={styles.skill_section}>
          <Text tag='div' size='main'>
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
