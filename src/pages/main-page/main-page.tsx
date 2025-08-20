import { InfiniteGrid } from "@components/infinite-grid";
import styles from './main-page.module.scss';

export const MainPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.filterPanel}>Заглушка</div>
      <div className={styles.cardsContainer}>
        <InfiniteGrid title="Рекомендуем"></InfiniteGrid>
        <InfiniteGrid title="Популярное"></InfiniteGrid>
      </div>
    </main>
  )
};