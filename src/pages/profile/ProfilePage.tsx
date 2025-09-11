import styles from './ProfilePage.module.scss';
import IconRequest from '../../shared/assets/icons/ui/request.svg?react';
import IconMessage from '../../shared/assets/icons/ui/message-text.svg?react';
import IconLike from '../../shared/assets/icons/ui/like.svg?react';
import IconIdea from '../../shared/assets/icons/ui/idea.svg?react';
import IconUser from '../../shared/assets/icons/ui/user.svg?react';
import { Text } from '@ui/text';
import { NavLink, Outlet } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.leftPart}>
        <ul className={styles.menu}>
          <li >
            <NavLink to={'/temp'} className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
              <IconRequest></IconRequest>
              <Text tag={'div'} size='main'>Заявки</Text>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/temp'} className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
              <IconMessage></IconMessage>
              <Text tag={'div'} size='main'>Мои обмены</Text>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/temp'} className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
              <IconLike></IconLike>
              <Text tag={'div'} size='main'>Избранное</Text>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/temp'} className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
              <IconIdea></IconIdea>
              <Text tag={'div'} size='main'>Мои навыки</Text>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/profile'} className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
              <IconUser></IconUser>
              <Text tag={'div'} size='main'>Личные данные</Text>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.rightPart}>
        <Outlet />
      </div>
    </div>
  )
};