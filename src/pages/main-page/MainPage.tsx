import { useState, useMemo } from 'react';

import { InfiniteGrid } from '@components/infinite-grid';
import ExpendableMenu from '@ui/expendable-menu/ExpendableMenu';
import { Checkbox } from '@ui/checkbox/checkbox';
import { RadioButton } from '@ui/radioButton/radioButton';

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
        (selectedMainFilter === 'Могу научить' &&
          s.can &&
          (s.can.title || s.can.category));

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
        (Array.isArray(s.want) &&
          s.want.some((w: any) => selectedCategories.includes(w.category)));

      if (!matchesCategory) return false;

      // 4) Города
      const matchesCity =
        selectedCities.length === 0 ||
        (s.city && selectedCities.includes(s.city));

      if (!matchesCity) return false;

      return true;
    });
  }, [skills, selectedMainFilter, selectedGender, selectedCategories, selectedCities]);

  return (
    <main className={styles.main}>
      <div className={styles.filterPanel}>
        {/* Главное меню */}
        <ExpendableMenu maxCount={3} collapsedLabel="Всё">
          {['Всё', 'Хочу научиться', 'Могу научить'].map((item) => (
            <RadioButton
              key={item}
              id={`main-${item}`}
              name="mainFilter"
              value={item}
              label={item}
              checked={selectedMainFilter === item}
              onChange={(val) => setSelectedMainFilter(val)}
            />
          ))}
        </ExpendableMenu>

        {/* Навыки */}
        <ExpendableMenu maxCount={5} collapsedLabel="Все категории">
          {categories.map((cat) => (
            <Checkbox
              key={cat}
              checked={selectedCategories.includes(cat)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories((prev) => [...prev, cat]);
                } else {
                  setSelectedCategories((prev) => prev.filter((c) => c !== cat));
                }
              }}
            >
              {cat}
            </Checkbox>
          ))}
        </ExpendableMenu>

        {/* Пол автора */}
        <ExpendableMenu maxCount={3} collapsedLabel="Не имеет значения">
          {['Не имеет значения', 'Мужской', 'Женский'].map((gender) => (
            <RadioButton
              key={gender}
              id={`gender-${gender}`}
              name="gender"
              value={gender}
              label={gender}
              checked={selectedGender === gender}
              onChange={(val) => setSelectedGender(val)}
            />
          ))}
        </ExpendableMenu>

        {/* Города */}
        <ExpendableMenu maxCount={5} collapsedLabel="Все города">
          {citiesList.map((city) => (
            <Checkbox
              key={city}
              checked={selectedCities.includes(city)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCities((prev) => [...prev, city]);
                } else {
                  setSelectedCities((prev) => prev.filter((c) => c !== city));
                }
              }}
            >
              {city}
            </Checkbox>
          ))}
        </ExpendableMenu>
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
