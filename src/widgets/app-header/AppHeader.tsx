/* eslint-disable import-x/prefer-default-export */
import { useRef, useState, type ChangeEvent } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import Chevron from '@icons/ui/chevron-down.svg?react';
import DarkThemeIcon from '@icons/ui/moon.svg?react';
// import LightThemeIcon from '@icons/ui/sun.svg?react';
import CrossIcon from '@icons/ui/cross.svg?react';
import LikeIcon from '@icons/ui/like.svg?react';
import { Logo } from '@ui/logo/Logo';
import Button from '@ui//button/Button';
import Avatar from '@ui//avatar/Avatar';
import { Text } from '@ui/text/Text';
import { InputSearch } from '@ui/input/Input';
import { type AppHeaderProps } from './types';
import styles from './AppHeader.module.scss';
import { useDispatch, useSelector } from '../../app/providers/store/store';
import { setSearchQuery } from '@entities/skill/model/skills-slice/skillsSlice';
import { getNewNotifications } from '@entities/user/model/user-slice/userSliсe';
import NotificationMenu from '../../features/requests/notification-menu/NotificationMenu';
import { Popover } from '@ui/popover/popover';
import { ProfileMenu } from '../../features/auth/ProfileMenu/ProfileMenu';
import { CategoryList } from '../../features/skills/category-list/CategoryList';
import { NotificationBell } from '@ui/notification-bell/notification-bell';

export const AppHeader = ({
  user,
  isRegistrationHeader = false
}: AppHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const newNotifs = useSelector(getNewNotifications);
  const hasNewNotifs = newNotifs.length !== 0;

  const [isOpenSkills, setIsOpenSkills] = useState(false); // состояние для поповера навыков
  const [isOpenNotification, setIsOpenNotification] = useState(false); // состояние для поповера уведомлений
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false); // состояние для поповера меню профиля

  const skillsRef = useRef<HTMLDivElement | null>(null); // ссылка на обёртку поповера навыкрв
  const notificationRef = useRef<HTMLDivElement | null>(null); // ссылка на обёртку поповера уведомлений
  const menuRef = useRef<HTMLDivElement | null>(null); // ссылка на обёртку поповера меню профиля

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set('search', value);
    } else {
      next.delete('search');
    }

    if (value.trim() && location.pathname !== '/') {
      navigate({ pathname: '/', search: `?${next.toString()}` });
    } else {
      setSearchParams(next);
    }

    dispatch(setSearchQuery(value));
  };

  const onIconClick = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('search');

    if (location.pathname !== '/') {
      navigate({ pathname: '/', search: '' });
    } else {
      setSearchParams(next);
    }
    dispatch(setSearchQuery(''));
  };

  const handleClose = () => {
    const from = location.state?.from;

    if (from) {
      navigate(from, { replace: true });
    } else if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </div>

      {isRegistrationHeader ? (
        <Button
          variant='tertiary'
          onClick={handleClose}
          style={{
            maxInlineSize: '147px'
          }}
        >
          Закрыть
          <CrossIcon style={{ color: 'var(--main-color-text)' }} />
        </Button>
      ) : (
        <>
          <div className={styles.menu}>
            {/* TODO: временная заглушка, заменить на реальный href */}
            <a href='/about' className={styles.link}>
              <Text tag='span' size='main' color='mainColorText'>
                О проекте
              </Text>
            </a>
            <div className={styles.popoverWrapper} ref={skillsRef}>
              <div
                className={styles.popoverButton}
                onClick={() => setIsOpenSkills(!isOpenSkills)}
              >
                <Text tag='span' size='main' color='mainColorText'>
                  Все навыки
                </Text>
                <Chevron />
              </div>
              <Popover
                isOpen={isOpenSkills}
                onClose={() => setIsOpenSkills(false)}
                triggerRef={skillsRef}
                isRightAligned={false}
              >
                <CategoryList onSelect={() => setIsOpenSkills(false)} />
              </Popover>
            </div>
          </div>
          <InputSearch
            value={searchParams.get('search') || ''}
            onChange={handleSearch}
            placeholder='Искать навык'
            inputSize={user ? 'xlarge' : 'large'}
            icon={searchParams.get('search') ? <CrossIcon /> : undefined}
            onIconClick={onIconClick}
          />
          <button className={styles.themeToggleButton}>
            {/* TODO: временная заглушка, 
            заменить на логику отображения кнопки в зависимости от темы: sun/moon */}
            <DarkThemeIcon />
          </button>

          <div className={styles.accountBlock}>
            {user ? (
              <div className={styles.userBlock}>
                {/* TODO: Заглушки для иконок, возможно нужны отдельные UI */}
                <div className={styles.popoverWrapper} ref={notificationRef}>
                  <NotificationBell
                    onClick={() => setIsOpenNotification(!isOpenNotification)}
                    hasNew={hasNewNotifs}
                  />
                  <Popover
                    isOpen={isOpenNotification}
                    onClose={() => setIsOpenNotification(false)}
                    triggerRef={notificationRef}
                    isRightAligned={true}
                  >
                    <NotificationMenu />
                  </Popover>
                </div>
                <LikeIcon />
                <div className={styles.popoverWrapper} ref={menuRef}>
                  <div
                    className={styles.userInfo}
                    onClick={() => setIsOpenProfileMenu(!isOpenProfileMenu)}
                  >
                    <Text tag='p' size='main' color='mainColorText'>
                      {user.name}
                    </Text>
                    <Avatar src={user.image} size='small' />
                  </div>
                  <Popover
                    isOpen={isOpenProfileMenu}
                    onClose={() => setIsOpenProfileMenu(false)}
                    triggerRef={menuRef}
                    isRightAligned={true}
                  >
                    <ProfileMenu onSelect={() => setIsOpenProfileMenu(false)} />
                  </Popover>
                </div>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Button
                  variant='secondary'
                  style={{ maxInlineSize: '92px' }}
                  onClick={() =>
                    navigate('/login', {
                      state: { from: location.pathname + location.search }
                    })
                  }
                >
                  Войти
                </Button>
                <Button variant='primary' onClick={() => navigate('/register')}>
                  Зарегистрироваться
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};
