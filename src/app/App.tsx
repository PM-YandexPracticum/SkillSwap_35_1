import { MainPage } from '../pages/main-page';
import { AppFooter } from '../app/components/app-footer';
import { AppHeader } from '../app/components/app-header';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage />
      <AppFooter />
    </div>
  );
};

export default App;
