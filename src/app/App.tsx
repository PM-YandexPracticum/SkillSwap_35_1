import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { SearchPage } from '../pages/search-page';
import { LatestSkills } from '../pages/latest-skills';
import { PopularSkills } from '../pages/popular-skills';
import { FilterPage } from '../pages/filter-page';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { SkillPage } from '../pages/skill-page';
import { RegisterPage } from '../pages/register-page';
import { LoginPage } from '../pages/login-page';
import { AppFooter } from '../shared/ui/app-footer';
import { AppHeader } from '../widgets/app-header';
import { ProtectedRoute } from '../features/auth/providers/ProtectedRoute';
import { FilterLayout } from '../shared/layouts/filter-layout';
import { useSelector, useDispatch } from './providers/store/store';
import styles from './App.module.scss';
import { loadSkills } from '../entities/skill/model/skills-slice/skillsSlice';
import { checkUserAuth, getUserData } from "@entities/user/model/user-slice/userSlice";
import SearchWatcher from '../features/search/search-watcher/SearchWatcher';
import FilterWatcher from '../features/filter/filters-watcher/FiltersWatcher';
import { NotFoundPage404 } from '../pages/not-found404';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSkills(0));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader user={user} />
      <main className={styles.main}>
        <Routes>
          <Route element={<FilterLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/popular' element={<PopularSkills />} />
            <Route path='/latest' element={<LatestSkills />} />
            <Route path='/filter' element={<FilterPage />} />
          </Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path='/skills/:id' element={<SkillPage />} />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage404 />} />
        </Routes>
        <SearchWatcher />
        <FilterWatcher />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
