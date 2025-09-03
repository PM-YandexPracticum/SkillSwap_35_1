import styles from './CategoryList.module.scss';
import IconBriefcase from '@icons/ui/briefcase.svg?react';
import IconGlobal from '@icons/ui/global.svg?react';
import IconHome from '@icons/ui/home.svg?react';
import IconPalette from '@icons/ui/palette.svg?react';
import IconBook from '@icons/ui/book.svg?react';
import IconLifestyle from '@icons/ui/lifestyle.svg?react';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import skillCategories from '@lib/constants/skillCategories';
import type { CategoryListProps } from './types';

export const CategoryList = (props: CategoryListProps) => {
  const { onClick } = props;

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {getBlock('Бизнес и карьера', IconBriefcase, styles.icon_briefcase, onClick)}
        {getBlock('Иностранные языки', IconGlobal, styles.icon_global, onClick)}
        {getBlock('Дом и уют', IconHome, styles.icon_home, onClick)}
      </div>
      <div className={styles.column}>
        {getBlock('Творчество и искусство', IconPalette, styles.icon_palette, onClick)}
        {getBlock('Образование и развитие', IconBook, styles.icon_book, onClick)}
        {getBlock('Здоровье и лайфстайл', IconLifestyle, styles.icon_lifestyle, onClick)}
      </div>
    </div>
  );
}

const getBlock = (category: string, Icon:React.FunctionComponent, iconStyle: string, onClick: (categories: string[]) => void) => {
  const onItemClick = (name: string) => {
    onClick([name]);
  }

  const onTitleClick = () => {
    onClick(skillCategories[category]);
  }

  return (
    <div className={styles.block}>
      <div className={`${styles.icon} ${iconStyle}`}>
        <Icon />
      </div>
      <div className={styles.list}>
        <button type='button' onClick={onTitleClick} className={styles.button}>
          <Title tag='h3'>{category}</Title>
        </button>
        <ul>
          {skillCategories[category].map(i => (
            <li key={i}>
              <button type='button' onClick={() => onItemClick(i)} className={styles.button}>
                <Text tag='p' size='main'>{i}</Text>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}