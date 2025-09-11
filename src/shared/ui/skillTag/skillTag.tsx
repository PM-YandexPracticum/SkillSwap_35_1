import type { SkillTagProps } from './type';
import styles from './skillTag.module.scss';

// eslint-disable-next-line import-x/prefer-default-export
export const SkillTag = ({
  name,
  category,
  isCountExtra = false
}: SkillTagProps) => {
  // получение названия класса в зависимости от категории навыка
  const getClassCategory = (): string => {
    switch (category) {
      case 'Иностранные языки':
        return 'skill__tag-language';
      case 'Бизнес и карьера':
        return 'skill__tag-business';
      case 'Творчество и искусство':
        return 'skill__tag-creative';
      case 'Образование и развитие':
        return 'skill__tag-education';
      case 'Дом и уют':
        return 'skill__tag-household';
      case 'Здоровье и лайфстайл':
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
