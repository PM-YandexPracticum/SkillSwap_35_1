import styles from './ImageGallery.module.scss';
import { useState } from 'react';
import IconLeft from '@icons/ui/chevron-left.svg?react';
import IconRight from '@icons/ui/chevron-right.svg?react';
import { Text } from '@ui/text';
import type { ImageGalleryProp } from './types';

export const ImageGallery = (props: ImageGalleryProp) => {
  const [index, setIndex] = useState(0);
  const { images } = props;

  const getUrlByIndex = (i: number) => `url('${images[i]}')`;
  const url = (images.length > 0 && index < images.length) ? getUrlByIndex(index) : '';

  const onLeftClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const onRightClick = () => {
    if (images.length > 0 && index < (images.length - 1)) {
      setIndex(index + 1);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.image} style={{backgroundImage: url}}>
        { index > 0 && (
          <div className={`${styles.arrow} ${styles.left}`} onClick={onLeftClick}>
            <IconLeft className={styles.icon} />
          </div>
        )}
        { index < (images.length - 1) && (
          <div className={`${styles.arrow} ${styles.right}`} onClick={onRightClick}>
            <IconRight className={styles.icon} />
          </div>
        )}
      </div>
      <div className={styles.preview}>
        { images.length > 1 && <div className={styles.thumbnail} style={{backgroundImage: getUrlByIndex(1)}}></div> }
        { images.length > 2 && <div className={styles.thumbnail} style={{backgroundImage: getUrlByIndex(2)}}></div> }
        { images.length > 3 && (
          <div className={styles.thumbnail} style={{backgroundImage: getUrlByIndex(3)}}>
            { images.length > 4 && (
              <div className={styles.more}>
                <Text tag='div' size='main'>{`+${images.length - 4}`}</Text>
              </div>
            )}
          </div> 
        )}
      </div>
    </div>
  );
}