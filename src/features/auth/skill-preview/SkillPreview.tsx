import styles from './SkillPreview.module.scss'
import { Title } from '@ui/title/Title';
import { Text } from '@ui/text/Text';
import { SkillDetails } from '@entities/skill/ui/skill-details';
import type { SkillPreviewProps } from './types';

export const SkillPreview = (props: SkillPreviewProps) => {
  const {
    title,
    subTitle,
    text,
    images,
    onEditClick,
    onDoneClick
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title tag='h3'>Ваше предложение</Title>
        <Text tag='p' size='details'>Пожалуйста, проверьте и подтвердите правильность данных</Text>
      </div>
      <SkillDetails
        title={title}
        subTitle={subTitle}
        text={text}
        images={images}
        variant='can'
        onEditClick={onEditClick}
        onDoneClick={onDoneClick}
      />
    </div>
  );
}