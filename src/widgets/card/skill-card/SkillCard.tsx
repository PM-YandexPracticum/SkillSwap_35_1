/* eslint-disable import-x/prefer-default-export */
import { useState } from 'react';
import Avatar from '@ui/avatar/Avatar';
import { SkillTag } from '@ui/skillTag/skillTag';
import { Text } from '@ui/text/Text';
import Button from '@ui/button/Button';
import { LikeButton } from '@ui/likeButton';
import styles from './SkillCard.module.scss';
import type { SkillCardProps } from './types';
import { getAgeWithSuffix } from '../../../utils/getAgeWithSuffix';
import { useNavigate } from 'react-router-dom';

export const SkillCard = (props: SkillCardProps) => {
  const {
    id,
    userName,
    userCity,
    userDateofBirth,
    userSkillCategory,
    userSkillName,
    userPhotoUrl,
    userAbout,
    skillsToLearn
  } = props;

  const [liked, setLiked] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.container} ${userAbout ? styles['with-about'] : ''}`}
    >
      <div className={styles.user}>
        <Avatar src={userPhotoUrl} size='medium' />
        <div className={styles.user_info}>
          <p className={styles.user_name}>{userName}</p>
          <Text
            tag='p'
            size='details'
          >{`${userCity}, ${getAgeWithSuffix(userDateofBirth)}`}</Text>
        </div>
        {!userAbout && (
          <div className={styles.like}>
            <LikeButton
              onClick={() => {
                setLiked((prev) => !prev);
              }}
              liked={liked}
            />
          </div>
        )}
      </div>
      {userAbout && (
        <Text tag='p' size='main'>
          {userAbout}
        </Text>
      )}
      <div
        className={`${styles.skills} ${userAbout ? styles['with-about'] : ''}`}
      >
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
            {userAbout ? (
              skillsToLearn.map((skill, index) => (
                <SkillTag
                  key={index}
                  name={skill.subcategory}
                  category={skill.category}
                />
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      {!userAbout && (
        <Button onClick={() => navigate(`/skills/${id}`)}>Подробнее</Button>
      )}
    </div>
  );
};
