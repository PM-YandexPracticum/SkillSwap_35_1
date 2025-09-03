import type { CategoryListProps } from './types';
import { useDispatch } from 'react-redux';
import { setFilters } from '@entities/skill/model/skills-slice/skillsSlice';
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

export const CategoryList = ({ onSelect }: CategoryListProps) => {
  const dispatch = useDispatch();

  const handleCategoryClick = (subcategories: string[]) => {
    dispatch(
      setFilters({
        subcategories,
        gender: 'Не имеет значения',
        cities: [],
        searchTarget: 'Всё'
      })
    );
    onSelect?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {getBlock('Бизнес и карьера', IconBriefcase, styles.icon_briefcase, handleCategoryClick)}
        {getBlock('Иностранные языки', IconGlobal, styles.icon_global, handleCategoryClick)}
        {getBlock('Дом и уют', IconHome, styles.icon_home, handleCategoryClick)}
      </div>
      <div className={styles.column}>
        {getBlock('Творчество и искусство', IconPalette, styles.icon_palette, handleCategoryClick)}
        {getBlock('Образование и развитие', IconBook, styles.icon_book, handleCategoryClick)}
        {getBlock('Здоровье и лайфстайл', IconLifestyle, styles.icon_lifestyle, handleCategoryClick)}
      </div>
    </div>
  );
}

const getBlock = (
  category: string,
  Icon: React.FunctionComponent,
  iconStyle: string,
  handleCategoryClick: (subcategories: string[]) => void
) => {
  const handleItemClick = (name: string) => {
    handleCategoryClick([name]);
  };

  const handleTitleClick = () => {
    handleCategoryClick(skillCategories[category]);
  };

  return (
    <div className={styles.block}>
      <div className={`${styles.icon} ${iconStyle}`}>
        <Icon />
      </div>
      <div className={styles.list}>
        <button type="button" onClick={handleTitleClick} className={styles.button}>
          <Title tag="h3">{category}</Title>
        </button>
        <ul>
          {skillCategories[category].map((i) => (
            <li key={i}>
              <button type="button" onClick={() => handleItemClick(i)} className={styles.button}>
                <Text tag="p" size="main">{i}</Text>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
