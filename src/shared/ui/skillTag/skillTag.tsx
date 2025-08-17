import type { FC } from 'react';
import type { SkillTagProps } from './type';
import styles from './skillTag.module.scss';

// eslint-disable-next-line import-x/prefer-default-export
export const SkillTag: FC<SkillTagProps> = ({
  name,
  category,
  isCountExtra = false
}) => {
  // получение названия класса в зависимости от категории навыка
  const getClassCategory = (): string => {
    switch (category) {
      case 'language':
        return 'skill__tag-language';
      case 'business':
        return 'skill__tag-business';
      case 'creative':
        return 'skill__tag-creative';
      case 'education':
        return 'skill__tag-education';
      case 'household':
        return 'skill__tag-household';
      case 'health':
        return 'skill__tag-health';
      default:
        return 'skill__tag-other';
    }
  };
  // вывод тэга с количеством дополнительных навыков (если у человека 4, то +2)
  if (isCountExtra) {
    return (
      <div className={`${styles.skill__tag} ${styles[getClassCategory()]}`}>
        {`+${name}`}
      </div>
    );
  }
  // если дополнительных тэгов нет, то вывод как обычно
  return (
    <div className={`${styles.skill__tag} ${styles[getClassCategory()]}`}>
      {name}
    </div>
  );
};
