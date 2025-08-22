import { useEffect } from 'react';
import { MainPage } from '../pages/main-page';
import { AppFooter } from '../app/components/app-footer';
import { AppHeader } from '../app/components/app-header';
import { useDispatch } from './services/store';
import styles from './App.module.scss';
import { getMockSkills } from './services/slices/skillsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMockSkills(0));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <MainPage />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
