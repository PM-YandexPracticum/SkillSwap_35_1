import styles from './ProfileMenu.module.scss';
import type { ProfileMenuProps } from './types';
import IconLogout from '../../../shared/assets/icons/ui/logout.svg?react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../app/providers/store/store';
import { logoutUser } from '@entities/user/model/user-slice/userSliсe';

export const ProfileMenu = ({ onSelect }: ProfileMenuProps) => {
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logoutUser());
  }
  return (
    <div className={styles.menu}>
      <Link to={'/profile'} className={`${styles.menu__item} ${styles.link}`}>
        <span onClick={onSelect} className={styles.text}>Личный кабинет</span>
      </Link>
      <button className={`${styles.menu__item} ${styles.button}`} onClick={handlelogout}>
        <span onClick={onSelect} className={styles.text}>Выйти из аккаунта</span>
        <IconLogout />
      </button>
    </div>
  )
};