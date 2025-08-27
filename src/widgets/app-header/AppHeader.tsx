/* eslint-disable import-x/prefer-default-export */
import { useState, type ChangeEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Chevron from '@icons/ui/chevron-down.svg?react';
import DarkThemeIcon from '@icons/ui/moon.svg?react';
// import LightThemeIcon from '@icons/ui/sun.svg?react';
import CrossIcon from '@icons/ui/cross.svg?react';
import NotificationIcon from '@icons/ui/notification.svg?react';
import LikeIcon from '@icons/ui/like.svg?react';
import { Logo } from '@ui/logo/Logo';
import Button from '@ui//button/Button';
import Avatar from '@ui//avatar/Avatar';
import { Text } from '@ui/text/Text';
import { InputSearch } from '@ui/input/Input';
import { type AppHeaderProps } from './types';
import styles from './AppHeader.module.scss';
import { useDispatch } from '../../app/providers/store/store';
import { setSearchQuery } from '../../entities/skill/model/skills-slice/skillsSlice';

export const AppHeader = ({
  user,
  isRegistrationHeader = false
}: AppHeaderProps) => {
  const [searchValue, setSearchValue] = useState(''); // для инпута поиска
  const dispatch = useDispatch();
  const location = useLocation();

  const isFilterPage =
    location.pathname === '/filter';

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const onIconClick = () => {
    setSearchValue('');
    dispatch(setSearchQuery(''));
  };

  return (
    <header
      className={`${styles.container} ${isFilterPage ? styles.start : ''}`}
    >
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </div>

      {isRegistrationHeader ? (
        <Button
          variant='tertiary'
          style={{
            maxInlineSize: '147px'
          }}
        >
          <Text as='span' size='main' color='mainColorText'>
            Закрыть
          </Text>
          <CrossIcon style={{ color: 'var(--main-color-text)' }} />
        </Button>
      ) : (
        <>
          <div className={styles.menu}>
            {/* TODO: временная заглушка, заменить на реальный href */}
            <a href='/about' className={styles.link}>
              <Text as='span' size='main' color='mainColorText'>
                О проекте
              </Text>
            </a>
            {/* TODO: временная заглушка, заменить на настоящий выпадающий список */}
            <div className={styles.dropdown}>
              <Text as='span' size='main' color='mainColorText'>
                Все навыки
              </Text>
              <Chevron />
            </div>
          </div>

          {!isFilterPage && (
            <InputSearch
              value={searchValue}
              onChange={handleSearch}
              placeholder='Искать навык'
              inputSize={user ? 'xlarge' : 'large'}
              icon={searchValue ? <CrossIcon /> : undefined}
              onIconClick={onIconClick}
            />
          )}

          <button type='button' className={styles.themeToggleButton}>
            {/* TODO: временная заглушка, 
            заменить на логику отображения кнопки в зависимости от темы: sun/moon */}
            <DarkThemeIcon />
          </button>

          <div className={styles.accountBlock}>
            {user ? (
              <div className={styles.userBlock}>
                {/* TODO: Заглушки для иконок, возможно нужны отдельные UI */}
                <NotificationIcon />
                <LikeIcon />
                <div className={styles.userInfo}>
                  <Text as='p' size='main' color='mainColorText'>
                    {user.name}
                  </Text>
                  <Avatar src={user.image} size='small' />
                </div>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Button variant='secondary' style={{ maxInlineSize: '92px' }}>
                  Войти
                </Button>
                <Button variant='primary'>Зарегистрироваться</Button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};
