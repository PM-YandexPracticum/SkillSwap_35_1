/* eslint-disable arrow-body-style */
/* eslint-disable import-x/prefer-default-export */
import type { JSX } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation } from 'swiper/modules';
import 'swiper/css';
import ChevronRight from '@icons/ui/chevron-right.svg?react';
import type { SliderProps } from './types';
import styles from './slider.module.scss';

export const Slider = <T,>({
  data = [],
  renderItem,
  getItemId
}: SliderProps<T>): JSX.Element => {
  if (!data || data.length === 0) {
    return (
      <div className={`${styles.slider__wrapper}`}>
        <div>No items to display</div>
      </div>
    );
  }

  return (
    <div className={styles.slider__wrapper}>
      <Swiper
        modules={[Virtual, Navigation]}
        className={styles.slider}
        wrapperClass={styles.slider__track}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          740: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 }
        }}
        navigation={{
          prevEl: `.${styles.slider__navigation_prev}`,
          nextEl: `.${styles.slider__navigation_next}`
        }}
        virtual
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          notificationClass: 'swiper-notification'
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={getItemId(item)}
            virtualIndex={index}
            role='group'
            aria-roledescription='slide'
            aria-label={`Slide ${index} of ${data.length}`}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type='button'
        aria-label='Previous slide'
        title='Previous slide'
        className={`${styles.slider__navigation} ${styles.slider__navigation_prev}`}
      >
        <ChevronRight width={16} stroke='currentColor' />
      </button>

      <button
        type='button'
        aria-label='Next slide'
        title='Next slide'
        className={`${styles.slider__navigation} ${styles.slider__navigation_next}`}
      >
        <ChevronRight width={16} stroke='currentColor' />
      </button>
    </div>
  );
};
