import { type FC } from 'react';
import type { LikeButtonUIProps } from './type';
import styles from './likeButton.module.scss';
import LikeIcon from '@icons/ui/like.svg?react';

export const LikeButton: FC<LikeButtonUIProps> = ({ liked, onClick }) => {
  return (
    <button 
      className={`${styles.likeButton} ${liked ? styles.likeButtonActive : ''}`} 
      onClick={onClick}
    >
      <LikeIcon />
    </button>
  );
};