import { type FC } from 'react';
import type { LikeButtonUIProps } from './type';
import styles from './likeButton.module.scss';
import LikeActive from '../../assets/icons/ui/like-active.svg';
import LikeInactive from '../../assets/icons/ui/like-inactive.svg';

export const LikeButton: FC<LikeButtonUIProps> = ({ liked, onClick }) => {
  return (
    <button className={styles.likeButton} onClick={onClick}>
      {liked ? <LikeActive /> : <LikeInactive />}
    </button>
  );
};
