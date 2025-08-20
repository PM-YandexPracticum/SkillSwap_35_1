import styles from './AppFooter.module.scss';
import { Logo } from '@ui/logo';

export const AppFooter = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <p className={styles.copyright}>SkillSwap - 2025</p>
      </div>
      <div className={styles.block}>
        <a href='#' target='_blank' className={styles.link}>О проекте</a>
        <a href='#' target='_blank' className={styles.link}>Все навыки</a>
      </div>
      <div className={styles.block}>
        <a href='#' target='_blank' className={styles.link}>Контакты</a>
        <a href='#' target='_blank' className={styles.link}>Блог</a>
      </div>
      <div className={styles.block}>
        <a href='#' target='_blank' className={styles.link}>Политика конфиденциальности</a>
        <a href='#' target='_blank' className={styles.link}>Пользовательское соглашение</a>
      </div>
    </footer>
  );
}