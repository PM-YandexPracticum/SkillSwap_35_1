import styles from './ProfileMenu.module.scss';
import IconLogout from '../../../shared/assets/icons/ui/logout.svg?react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../app/providers/store/store';
import { logoutUser } from '@entities/user/model/user-slice/userSliсe';

export const ProfileMenu = () => {
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logoutUser());
  }
  return (
    <div className={styles.menu}>
      <Link to={'/profile'} className={`${styles.menu__item} ${styles.link}`}>
        <span className={styles.text}>Личный кабинет</span>
      </Link>
      <button className={`${styles.menu__item} ${styles.button}`} onClick={handlelogout}>
        <span className={styles.text}>Выйти из аккаунта</span>
        <IconLogout />
      </button>
    </div>
  )
};