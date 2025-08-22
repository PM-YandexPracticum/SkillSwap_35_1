// src/pages/main-page/MainPage.tsx
import { useState, useMemo } from 'react';

import { InfiniteGrid } from '@components/infinite-grid';
import ExpendableMenu from '@ui/expendable-menu/ExpendableMenu';
import citiesList from '@lib/cities';
import skillCategories from '@lib/skillCategories';

import { useDispatch, useSelector } from '../../app/services/store';
import { getMockSkills } from '../../app/services/slices/skillsSlice';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  // локальные состояния фильтров
  const [selectedMainFilter, setSelectedMainFilter] = useState('Всё');
  const [selectedGender, setSelectedGender] = useState('Не имеет значения');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const categories = Object.keys(skillCategories);

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(getMockSkills(skills.length));
    }
  };

  // применяем фильтры
  const filteredSkills = useMemo(() => {
    return skills.filter((s: any) => {
      // 1) Фильтр "Хочу научиться / Могу научить"
      const matchesMain =
        selectedMainFilter === 'Всё' ||
        (selectedMainFilter === 'Хочу научиться' &&
          Array.isArray(s.want) &&
          s.want.length > 0) ||
        (selectedMainFilter === 'Могу научить' && s.can && (s.can.title || s.can.category));

      if (!matchesMain) return false;

      // 2) Пол автора
      const matchesGender =
        selectedGender === 'Не имеет значения' ||
        (selectedGender === 'Мужской' && s.gender === 'male') ||
        (selectedGender === 'Женский' && s.gender === 'female');

      if (!matchesGender) return false;

      // 3) Категории
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(s?.can?.category) ||
        (Array.isArray(s.want) && s.want.some((w: any) => selectedCategories.includes(w.category)));

      if (!matchesCategory) return false;

      // 4) Города
      const matchesCity =
        selectedCities.length === 0 || (s.city && selectedCities.includes(s.city));

      if (!matchesCity) return false;

      return true;
    });
  }, [skills, selectedMainFilter, selectedGender, selectedCategories, selectedCities]);

  return (
    <main className={styles.main}>
      <div className={styles.filterPanel}>
        {/* Главное меню */}
        <ExpendableMenu
          title="Фильтры"
          items={['Всё', 'Хочу научиться', 'Могу научить']}
          visibleCount={3}
          collapsedLabel="Всё"
          onSelect={(val) => {
            if (typeof val === 'string') setSelectedMainFilter(val);
          }}
          multiple={false}
        />

        {/* Навыки */}
        <ExpendableMenu
          title="Навыки"
          items={categories}
          visibleCount={5}
          collapsedLabel="Все категории"
          onSelect={(val) => {
            if (Array.isArray(val)) setSelectedCategories(val);
          }}
          multiple
        />

        {/* Пол автора */}
        <ExpendableMenu
          title="Пол автора"
          items={['Не имеет значения', 'Мужской', 'Женский']}
          visibleCount={3}
          collapsedLabel="Не имеет значения"
          onSelect={(val) => {
            if (typeof val === 'string') setSelectedGender(val);
          }}
          multiple={false}
        />

        {/* Города */}
        <ExpendableMenu
          title="Город"
          items={citiesList}
          visibleCount={5}
          collapsedLabel="Все города"
          onSelect={(val) => {
            if (Array.isArray(val)) setSelectedCities(val);
          }}
          multiple
        />
      </div>

      <div className={styles.cardsContainer}>
        <InfiniteGrid
          title="Рекомендуем"
          data={filteredSkills}
          fetchData={fetchMoreData}
          hasMore={hasMore}
        />
      </div>
    </main>
  );
};
