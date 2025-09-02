import styles from './ImageGallery.module.scss';
import { useState } from 'react';
import IconLeft from '@icons/ui/chevron-left.svg?react';
import IconRight from '@icons/ui/chevron-right.svg?react';
import { Text } from '@ui/text';
import type { ImageGalleryProp } from './types';

export const ImageGallery = ({ images }: ImageGalleryProp) => {
  const [index, setIndex] = useState(0);

  const onLeftClick = () => {
    if (index > 0) setIndex(index - 1);
  };

  const onRightClick = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {images[index] && (
          <img
            className={styles.img}
            src={images[index]}
            alt={`Изображение навыка ${index + 1} из ${images.length}`}
          />
        )}
        {index > 0 && (
          <div className={`${styles.arrow} ${styles.left}`} onClick={onLeftClick}>
            <IconLeft className={styles.icon} />
          </div>
        )}
        {index < images.length - 1 && (
          <div className={`${styles.arrow} ${styles.right}`} onClick={onRightClick}>
            <IconRight className={styles.icon} />
          </div>
        )}
      </div>

      <div className={styles.preview}>
        {images.slice(1, 4).map((img, i) => (
          <div key={i} className={styles.thumbnail}>
            <img
              className={styles.img}
              src={img}
              alt={`Миниатюра изображения ${i + 1}`}
            />
            {i === 2 && images.length > 4 && (
              <div className={styles.more}>
                <Text tag="div" size="main">{`+${images.length - 4}`}</Text>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
