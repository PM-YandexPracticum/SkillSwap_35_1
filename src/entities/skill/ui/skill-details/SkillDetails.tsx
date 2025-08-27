import styles from './SkillDetails.module.scss'
import { LikeButton } from '@ui/likeButton';
import IconShare from '@icons/ui/share.svg?react';
import IconMore from '@icons/ui/more-square.svg?react';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Button from '@ui/button/Button';
import { ImageGallery } from '@ui/image-gallery';
import type { SkillDetailsProps } from './types';

export const SkillDetails = (props: SkillDetailsProps) => {
  const {
    images,
    text,
    subTitle,
    title,
    isLiked,
    onExchangeClick,
    onLikeClick,
    onShareClick,
    onMoreClick,
} = props;

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <LikeButton liked={isLiked} onClick={onLikeClick} />
        <IconShare onClick={onShareClick} />
        <IconMore onClick={onMoreClick} />
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <Title as='h2'>{title}</Title>
          <div className={styles.subtitle}>
            <Text as='p' size='details' color='tertiaryColorDark'>{subTitle}</Text>
          </div>
          <div className={styles.text}>
            <Text as='p' size='main'>{text}</Text>
          </div>
          <Button style={{marginTop: 'auto'}} onClick={onExchangeClick}>Предложить обмен</Button>
        </div>
        <ImageGallery images={images} />
      </div>
    </div>
  );
}