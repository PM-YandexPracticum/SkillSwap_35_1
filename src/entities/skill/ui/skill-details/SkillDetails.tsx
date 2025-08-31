/* eslint-disable import-x/prefer-default-export */
import { LikeButton } from '@ui/likeButton';
import IconShare from '@icons/ui/share.svg?react';
import IconMore from '@icons/ui/more-square.svg?react';
import IconEdit from '@icons/ui/edit.svg?react';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Button from '@ui/button/Button';
import { ImageGallery } from '@ui/image-gallery';
import styles from './SkillDetails.module.scss';
import type { SkillDetailsProps } from './types';

export const SkillDetails = (props: SkillDetailsProps) => {
  const {
    images,
    text,
    subTitle,
    title,
    isLiked = false,
    isLikeActive = false,
    variant,
    onExchangeClick,
    onLikeClick,
    onShareClick,
    onMoreClick,
    onEditClick,
    onDoneClick
  } = props;

  return (
    <div
      className={`${styles.container} ${variant === 'can' ? styles.modal : ''}`}
    >
      {variant !== 'can' && (
        <div className={styles.actions}>
          <LikeButton liked={isLiked} onClick={onLikeClick} isActive={isLikeActive} />
          <IconShare onClick={onShareClick} />
          <IconMore onClick={onMoreClick} />
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.content}>
          <Title tag='h2'>{title}</Title>
          <div className={styles.subtitle}>
            <Text tag='p' size='details' color='tertiaryColorDark'>{subTitle}</Text>
          </div>
          <div className={styles.text}>
            <Text tag='p' size='main'>{text}</Text>
          </div>
          {variant === 'can' ? (
            <div className={styles.buttonsContainer}>
              <Button variant='secondary' onClick={onEditClick}>
                Редактировать <IconEdit />
              </Button>
              <Button onClick={onDoneClick} htmlType='submit'>
                Готово
              </Button>
            </div>
          ) : (
            <Button style={{ marginTop: 'auto' }} onClick={onExchangeClick}>
              Предложить обмен
            </Button>
          )}
        </div>
        <ImageGallery images={images} />
      </div>
    </div>
  );
};
