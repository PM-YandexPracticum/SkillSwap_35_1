import Avatar from '@ui/avatar/Avatar';
import { SkillTag } from '@ui/skillTag/skillTag';
import Button from '@ui/button/Button';
import IconLike from '@icons/ui/like.svg?react';
import styles from './SkillCard.module.scss';
import type { SkillCardProps } from './types';

export const SkillCard = (props: SkillCardProps) => {
  const {
    userName,
    userDetails,
    userSkillCategory,
    userSkillName,
    userPhotoUrl,
    skillsToLearn,
    onLikeClick,
    onDetailsClick
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar src={userPhotoUrl} size='medium' />
        <div className={styles.user_info}>
          <p className={styles.user_name}>{userName}</p>
          <p className={styles.user_details}>{userDetails}</p>
        </div>
        <div className={styles.like}>
          <IconLike onClick={onLikeClick} />
        </div>
      </div>
      <div className={styles.learn}>
        <p className={styles.text}>Может научить:</p>
        <SkillTag name={userSkillName} category={userSkillCategory} />
      </div>
      <div className={styles.teach}>
        <p className={styles.text}>Хочет научиться:</p>
        <div className={styles.skills_wrapper}>
          { (skillsToLearn.length > 0) && <SkillTag name={skillsToLearn[0].name} category={skillsToLearn[0].category} /> }
          { (skillsToLearn.length > 1) && <SkillTag name={skillsToLearn[1].name} category={skillsToLearn[1].category} /> }
          { (skillsToLearn.length > 2) && <SkillTag name={`+${skillsToLearn.length - 2}`} category='other' /> }
        </div>
      </div>
      <Button onClick={onDetailsClick}>Подробнее</Button>
    </div>
  );
}