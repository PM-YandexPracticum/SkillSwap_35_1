import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { SearchPage } from '../pages/search-page';
import { LatestSkills } from '../pages/latest-skills';
import { PopularSkills } from '../pages/popular-skills';
import { AppFooter } from '../app/components/app-footer';
import { AppHeader } from '../app/components/app-header';
import { FilterLayout } from '../widgets/filter/filter-layout';
import { useDispatch } from './services/store';
import styles from './App.module.scss';
import { loadSkills } from './services/slices/skillsSlice';
import SearchWatcher from '../features/search/SearchWatcher';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSkills(0));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route element={<FilterLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/popular' element={<PopularSkills />} />
            <Route path='/latest' element={<LatestSkills />} />
          </Route>
        </Routes>
        <SearchWatcher />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
