import styles from './SkillPreview.module.scss';
import { useNavigate } from 'react-router-dom';
import { Title } from '@ui/title/Title';
import { Text } from '@ui/text/Text';
import { SkillDetails } from '@entities/skill/ui/skill-details';
import { useSelector } from '../../app/providers/store/store';
import { getUserData } from '@entities/user/model/user-slice/userSliсe';

export const SkillPreview = () => {
  const navigate = useNavigate();
  
  const user = useSelector(getUserData);
  const skill = user?.can;

  if (!user || !skill ) {
    return (
     <div className={styles.container_empty}>
            <Text tag='span' size='main'>
              Навык не найден
            </Text>
          </div>
  )
}

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title tag='h3'>Ваше предложение</Title>
        <Text tag='p' size='details'>Пожалуйста, проверьте и подтвердите правильность данных</Text>
      </div>
      <SkillDetails
        title={skill.title}
        subTitle={`${skill.category} / ${skill.subcategory}`}
        text={skill.description}
        images={skill.images || []}
        variant='can'
        onEditClick={() => null}
        onDoneClick={() => navigate(-1)}
      />
    </div>
  );
}