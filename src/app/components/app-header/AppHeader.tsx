import React, { type FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Chevron from '@icons/ui/chevron-down.svg?react';
import DarkThemeIcon from '@icons/ui/moon.svg?react';
// import LightThemeIcon from '@icons/ui/sun.svg?react';
import CrossIcon from '@icons/ui/cross.svg?react';
import NotificationIcon from '@icons/ui/notification.svg?react';
import LikeIcon from '@icons/ui/like.svg?react';
import { InputSearch } from '../../../shared/ui/input/Input';
import { type AppHeaderProps } from './types';
import styles from './AppHeader.module.scss';
import { Logo } from '../../../shared/ui/logo/Logo';
import Button from '../../../shared/ui/button/Button';
import Avatar from '../../../shared/ui/avatar/Avatar';
import { Text } from '../../../shared/ui/text/Text';

const AppHeaderUI: React.FC<AppHeaderProps> = ({ user }) => {
  const [searchValue, setSearchValue] = React.useState(''); // для инпута поиска

  // для отображения header на этапе регистрации
  const location = useLocation();
  const isRegistration = location.pathname.startsWith('/register');
  const showContent = !isRegistration;
  const showCloseButton = isRegistration;

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </div>

      {/* TODO: возможно стоит пересмотреть вариант перехода на минимальный хэдэр
      сейчас использует локацию регистрации */}
      {showCloseButton && (
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
      )}

      {showContent && (
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
                <div className={styles.userIcons}>
                  <NotificationIcon />
                  <LikeIcon />
                </div>
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

// TODO: временная заглушка user - (undefined),
// позже заменить на реальное состояние через useState или контекст
const AppHeader: FC = () => <AppHeaderUI user={undefined} />;

export default AppHeader;
