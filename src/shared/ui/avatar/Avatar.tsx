import React from 'react';
import DefaultAvatar from '@icons/ui/user-circle.svg?react';
import { type AvatarProps } from './types';
import styles from './Avatar.module.scss';

const Avatar = ({
  src,
  alt = 'Аватар пользователя',
  size = 'medium',
  buttonIcon,
  onButtonClick
}: AvatarProps) => {
  const ButtonIcon = buttonIcon;

  return (
    <div className={`${styles.avatarWrapper} ${styles[size]}`}>
      {src ? (
        <img className={styles.avatarImage} src={src} alt={alt} />
      ) : (
        <DefaultAvatar className={styles.avatarDefaultImage} />
      )}

      {ButtonIcon && onButtonClick && (
        <button
          type='button'
          className={styles.avatarButton}
          onClick={onButtonClick}
          aria-label='Изменить аватар'
        >
          <ButtonIcon />
        </button>
      )}
    </div>
  );
};

export default React.memo(Avatar);
