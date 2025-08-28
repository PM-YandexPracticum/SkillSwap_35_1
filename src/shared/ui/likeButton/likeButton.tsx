import type { LikeButtonUIProps } from './type';
import styles from './likeButton.module.scss';
import ActiveLike from '@icons/ui/like-active.svg?react';
import EmptyLike from '@icons/ui/like.svg?react';

export const LikeButton = ({ liked, onClick }: LikeButtonUIProps) => {
  return (
    <button 
      className={`${styles.likeButton} ${liked ? styles.liked : ''}`} 
      onClick={onClick}
    >
      {liked? <ActiveLike className={styles.heart} />: <EmptyLike className={styles.heart} />}
    </button>
  );
};