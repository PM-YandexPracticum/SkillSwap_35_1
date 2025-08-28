import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { SearchPage } from '../pages/search-page';
import { LatestSkills } from '../pages/latest-skills';
import { PopularSkills } from '../pages/popular-skills';
import { FilterPage } from '../pages/filter-page';
import { AppFooter } from '../shared/ui/app-footer';
import { AppHeader } from '../widgets/app-header';
import { FilterLayout } from '../shared/layouts/filter-layout';
import { useDispatch } from './providers/store/store';
import styles from './App.module.scss';
import { loadSkills } from '../entities/skill/model/skills-slice/skillsSlice';
import SearchWatcher from '../features/search/search-watcher/SearchWatcher';
import FilterWatcher from '../features/filter/filters-watcher/FiltersWatcher';
import { NotFoundPage404 } from '../pages/not-found404';
import { ServerError500 } from '../pages/server-error500';

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
            <Route path='/filter' element={<FilterPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage404 />} />
          <Route path='/500' element={<ServerError500 />} />
        </Routes>
        <SearchWatcher />
        <FilterWatcher />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
