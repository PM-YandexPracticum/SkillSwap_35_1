/* eslint-disable react/no-array-index-key */
/* eslint-disable import-x/prefer-default-export */
import Avatar from '@ui/avatar/Avatar';
import { SkillTag } from '@ui/skillTag/skillTag';
import { Text } from '@ui/text/Text';
import Button from '@ui/button/Button';
import { LikeButton } from '@ui/likeButton';
import { useNavigate } from 'react-router-dom';
import {
  toggleFavorites,
  getUserData,
  getIsAuth
} from '../../../entities/user/model/user-slice/userSliсe';
import { useDispatch, useSelector } from '../../../app/providers/store/store';
import styles from './SkillCard.module.scss';
import type { SkillCardProps } from './types';
import { getAgeWithSuffix } from '../../../utils/getAgeWithSuffix';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUserData);

  const isLiked = user?.favorites?.includes(id) || false;
  const isRequestSent = user?.outgoingRequests?.includes(id) || false;

  const handleLikeClick = () => {
    if (!isAuth) {
      return;
    }
    dispatch(toggleFavorites(id));
  };

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
              onClick={handleLikeClick}
              liked={isLiked}
              isActive={isAuth}
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
      {!userAbout &&
        (!isRequestSent ? (
          <Button onClick={() => navigate(`/skills/${id}`)}>Подробнее</Button>
        ) : (
          <Button variant='secondary'>Обмен предложен</Button>
        ))}
    </div>
  );
};
