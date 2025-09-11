import type { LikeButtonUIProps } from './type';
import styles from './likeButton.module.scss';
import ActiveLike from '@icons/ui/like-active.svg?react';
import EmptyLike from '@icons/ui/like.svg?react';

export const LikeButton = ({ liked,
  onClick,
  isActive =  false
}: LikeButtonUIProps) => {
  return (
    <button 
      className={`${styles.likeButton} ${liked ? styles.liked : ''}`} 
      onClick={onClick}
      disabled={!isActive}
      aria-label={liked ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {liked? <ActiveLike className={styles.heart} />: <EmptyLike className={styles.heart} />}
    </button>
  );
};