import { MainPage } from '../pages/main-page';
import { AppFooter } from '../app/components/app-footer';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <MainPage />
      <AppFooter />
    </div>
  );
};

export default App;
