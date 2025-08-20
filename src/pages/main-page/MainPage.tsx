import { InfiniteGrid } from "@components/infinite-grid";
import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.filterPanel}>Заглушка</div>
      <div className={styles.cardsContainer}>
        <InfiniteGrid title="Рекомендуем"></InfiniteGrid>
      </div>
    </main>
  )
};