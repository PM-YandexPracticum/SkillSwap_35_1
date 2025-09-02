import styles from "./ButtonPreloader.module.scss";

export const ButtonPreloader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};
