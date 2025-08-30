import styles from './SkillPage.module.scss';
import { useSelector, useDispatch } from '../../app/providers/store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SkillCard } from '@widgets/card/skill-card';
import { CardsSlider } from '@widgets/card/cards-slider';
import { SkillDetails } from '@entities/skill/ui/skill-details';
import { getSkillById, getSkills, getSimilarSkills } from '@entities/skill/model/skills-slice/skillsSlice';
import type { IUser, IUserPublic } from '@entities/user/model/types/types';
import { getUserData, toggleFavorites } from '@entities/user/model/user-slice/userSliсe';

// #TODO: Убрать когда разберёмся с неправильными ссылками на картинки. пути к картинкам должны начинаться с '/'
const fixImgPath = (path: string) => (!path || path[0] === '/' ? path : '/' + path);

export const SkillPage = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);
  const { id } = useParams();
  const dispatch = useDispatch();

  const skill: IUserPublic | undefined = useSelector(getSkillById(id || ''));
  let similarSkills = useSelector(getSkills); // #TODO: Заменить на getSimilarSkills

  // #TODO: Убрать когда разберёмся с неправильными ссылками на картинки
  similarSkills = similarSkills.map(item => ({...item, image: item.image && fixImgPath(item.image) }));

  const user: IUser | null = useSelector(getUserData);

  if (!skill) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div>
      <div className={styles.container}>
        <SkillCard 
          id={skill.id}
          userName={skill.name}
          userCity={skill.city}
          userDateofBirth={skill.dateOfBirth}
          userSkillCategory={skill.can.category}
          userSkillName={skill.can.title}
          userPhotoUrl={skill.image && fixImgPath(skill.image)}
          skillsToLearn={skill.want}
          userAbout={skill.about}
        />
        <SkillDetails
          title={skill.can.title}
          subTitle={`${skill.can.category} / ${skill.can.subcategory}`}
          text={skill.can.description}
          images={skill.can.images ? skill.can.images.map(img => fixImgPath(img)) : []}
          variant='want'
          isLikeActive={!!user}
          isLiked={!!user && user.favorites.includes(skill.id)}
          onLikeClick={() => dispatch(toggleFavorites(skill.id))}
        />
      </div>
      <CardsSlider title='Похожие предложения' skillsList={similarSkills}/>
    </div>
  );
}