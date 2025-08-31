import styles from './SkillPage.module.scss';
import { useSelector, useDispatch } from '../../app/providers/store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SkillCard } from '@widgets/card/skill-card';
import { CardsSlider } from '@widgets/card/cards-slider';
import { SkillDetails } from '@entities/skill/ui/skill-details';
import { Preloader } from '@ui/preloader';
import { Text } from '@ui/text';
import {
  getPreview,
  fetchSkillById,
  getSimilarSkills,
  loadSimilarSkills,
  getLoading,
} from '@entities/skill/model/skills-slice/skillsSlice';
import type { IUser, IUserPublic } from '@entities/user/model/types/types';
import {
  getUserData,
  toggleFavorites
} from '@entities/user/model/user-slice/userSliсe';

export const SkillPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const skill: IUserPublic | null = useSelector(getPreview);
  const loading = useSelector(getLoading);
  const similarSkills = useSelector(getSimilarSkills);
  const user: IUser | null = useSelector(getUserData);

  useEffect(() => {
  if (!id) return;

  dispatch(fetchSkillById(id)).then(() => {
    dispatch(loadSimilarSkills(id));
  });
}, [id, dispatch]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!skill) {
    return loading ? (
      <div className={styles.page_empty}>
        <Preloader />
      </div>
    ) : (
      <div className={styles.page_empty}>
        <Text tag='span' size='main'>
          Пользователь не найден
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SkillCard
          id={skill.id}
          userName={skill.name}
          userCity={skill.city}
          userDateofBirth={skill.dateOfBirth}
          userSkillCategory={skill.can.category}
          userSkillName={skill.can.title}
          userPhotoUrl={skill.image}
          skillsToLearn={skill.want}
          userAbout={skill.about}
        />
        <SkillDetails
          title={skill.can.title}
          subTitle={`${skill.can.category} / ${skill.can.subcategory}`}
          text={skill.can.description}
          images={skill.can.images || []}
          variant='want'
          isLikeActive={!!user}
          isLiked={!!user && user.favorites.includes(skill.id)}
          onLikeClick={() => dispatch(toggleFavorites(skill.id))}
        />
      </div>
      <CardsSlider title='Похожие предложения' skillsList={similarSkills ?? []} />
    </div>
  );
};
