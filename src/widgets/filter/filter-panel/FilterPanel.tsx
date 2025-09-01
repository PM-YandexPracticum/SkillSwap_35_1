import styles from './FilterPanel.module.scss';
import { Title } from '@ui/title/Title';
import { Text } from '@ui/text/Text';
import IconCross from '@icons/ui/cross.svg?react';
import { RadioButton } from '@ui/radioButton/radioButton';
import { Checkbox } from '@ui/checkbox/checkbox';
import { CheckboxAccordion } from '@ui/checkboxAccordion/checkboxAccordion';
import ExpendableMenu from '@ui/expendable-menu/ExpendableMenu';
import type { CheckboxAccordionItem } from '@ui/checkboxAccordion/type';
import cities from '@lib/constants/cities';
import skillCategories from '@lib/constants/skillCategories';
import type { FilterPanelProps  } from './types';
import type { TGender, TSearchTarget } from '@shared-types/IFilters';

export const FilterPanel = (props: FilterPanelProps) => {
  const { filters, onChange, onReset } = props;

  const handleTargetChange = (value: TSearchTarget) => {
    onChange({...filters, searchTarget: value});
  }

  const handleGenderChange = (value: TGender) => {
    onChange({...filters, gender: value});
  }

  const handleCityChange = (value: string) => {
    if (filters.cities.includes(value)) {
      onChange({...filters, cities: filters.cities.filter(i => i !== value)});        
    } else {
      onChange({...filters, cities: [...filters.cities, value]});        
    }
  }

  const handleSkillsChange = (items: CheckboxAccordionItem[]) => {
    let subcategories = [...filters.subcategories];

    items.forEach(item => {
      if (item.checked) {
        if (!subcategories.includes(item.value)) {
          subcategories.push(item.value);
        }
      } else {
        subcategories = subcategories.filter(i => i !== item.value);
      }
    });
    
    onChange({...filters, subcategories});
  }

  const filtersCount = (filters.searchTarget !== 'Всё' ? 1 : 0) + 
    (filters.gender !== 'Не имеет значения' ? 1 : 0) +
    filters.cities.length + filters.subcategories.length;

  const skills: Record<string, CheckboxAccordionItem[]> = Object.keys(skillCategories).reduce((acc, val) => {
    return {...acc, [val]: skillCategories[val].map(i => ({value: i, checked: filters.subcategories.includes(i)}))};
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title tag='h3'>Фильтры{filtersCount > 0 ? ` (${filtersCount})` : ''}</Title>
        {filtersCount > 0 && (
          <div className={styles.reset} onClick={onReset}>
            <Text tag='div' size='main' color='accentColorDark'>Сбросить</Text>
            <IconCross/>
          </div>
        )}
      </div>
      <div className={styles.block}>
        <RadioButton
          id='target-all'
          name='target'
          value='target-all'
          checked={filters.searchTarget === 'Всё'}
          onChange={() => handleTargetChange('Всё')}
        >
          <Text tag='span' size='main'>Всё</Text>
        </RadioButton>
        <RadioButton
          id='target-learn'
          name='target'
          value='target-learn'
          checked={filters.searchTarget === 'Хочу научиться'}
          onChange={() => handleTargetChange('Хочу научиться')}
        >
          <Text tag='span' size='main'>Хочу научиться</Text>
        </RadioButton>
        <RadioButton
          id='target-teach'
          name='target'
          value='target-teach'
          checked={filters.searchTarget === 'Могу научить'}
          onChange={() => handleTargetChange('Могу научить')}
        >
          <Text tag='span' size='main'>Могу научить</Text>
        </RadioButton>
      </div>

      <Title tag='h4'>Навыки</Title>
      <div className={styles.block}>
        <ExpendableMenu maxCount={3} collapsedLabel='Все категории'>
        {Object.keys(skills).map(city => (
          <CheckboxAccordion
            key={city}
            groupName={city}
            items={skills[city]}
            onItemsChange={handleSkillsChange}
          />
        ))}
        </ExpendableMenu>
      </div>

      <Title tag='h4'>Пол автора</Title>
      <div className={styles.block}>
        <RadioButton
          id='gender-all'
          name='gender'
          value='gender-all'
          checked={filters.gender === 'Не имеет значения'}
          onChange={() => handleGenderChange('Не имеет значения')}
        >
          <Text tag='span' size='main'>Не имеет значения</Text>
        </RadioButton>
        <RadioButton
          id='gender-male'
          name='gender'
          value='hender-male'
          checked={filters.gender === 'Мужской'}
          onChange={() => handleGenderChange('Мужской')}
        >
          <Text tag='span' size='main'>Мужской</Text>
        </RadioButton>
        <RadioButton
          id='gender-female'
          name='gender'
          value='gender-femaile'
          checked={filters.gender === 'Женский'}
          onChange={() => handleGenderChange('Женский')}
        >
          <Text tag='span' size='main'>Женский</Text>
        </RadioButton>
      </div>

      <Title tag='h4'>Город</Title>
      <div className={styles.block}>
        <ExpendableMenu maxCount={3} collapsedLabel='Все города'>
        {cities.map(city => (
          <Checkbox
            key={city}
            checked={filters.cities.includes(city)}
            onChange={() => handleCityChange(city)}
          >
            <Text tag='span' size='main'>{city}</Text>
          </Checkbox>
        ))}
        </ExpendableMenu>
      </div>
    </div>
  );
}