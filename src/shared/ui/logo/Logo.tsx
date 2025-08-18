import Icon from '../../assets/icons/ui/star-logo.svg?react';

import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconLogoContainer}>
        <Icon className={styles.iconLogo}></Icon>
      </div>
      <div className={styles.textLogo}>SkillSwap</div>
    </div>
  );
};
