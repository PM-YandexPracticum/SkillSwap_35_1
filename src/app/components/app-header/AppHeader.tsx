import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  isRegistrationHeader = false
}) => {
  const [searchValue, setSearchValue] = useState(''); // для инпута поиска

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

          <InputSearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Искать навык'
            inputSize={user ? 'xlarge' : 'large'}
            icon={searchValue ? <CrossIcon /> : undefined}
            onIconClick={() => setSearchValue('')}
          />

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

export default AppHeader;
