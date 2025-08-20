import { useEffect, useState } from 'react';
import type { InfiniteGridProps } from './types';
import type { IUserPublic } from '../../../entities/types/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '@ui/title/Title';
import { Preloader } from '@ui/preloader';
import { SkillCard } from '../../../widgets/skill-card';
import styles from './Infinite.module.scss';

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({ title }) => {
  // Данные пользователей, для рендера карточки
  const [cards, setCards] = useState<IUserPublic[]>([]);
  // Флаг - есть ли еще не загруженные данные
  const [hasMore, setHasMore] = useState(true);

  // Заглушка для проверки моковых данных
  const generateMockCards = (startIndex: number, count = 20): IUserPublic[] => {
    return Array.from({ length: count }, (_, i) => {
      const newId = (startIndex + i).toString();

      return {
        id: newId,
        name: 'Маэстро',
        about: 'Единственный и неповторимый',
        gender: 'male',
        dateOfBirth: '1988-07-14',
        city: 'Санкт-Петербург',
        image:
          'https://distribution.faceit-cdn.net/images/5c0cd4f9-1b09-4c0a-9061-7c2c0edd24cb.jpeg',
        can: {
          title: 'Маркетинг SEO и SMM',
          category: 'Бизнес и карьера',
          subcategory: 'Маркетинг и реклама',
          description:
            'Научу заниматься SEO и SMM. Выстраивать бренд и таргетировать рекламу',
          images: [
            'https://distribution.faceit-cdn.net/images/5c0cd4f9-1b09-4c0a-9061-7c2c0edd24cb.jpeg'
          ]
        },
        want: [
          { subcategory: 'Медитация', category: 'Здоровье и лайфстайл' },
          { subcategory: 'Скорочтение', category: 'Образование и развитие' },
          { subcategory: 'Тайм-менеджмент', category: 'Бизнес и карьера' },
          { subcategory: 'Фотография', category: 'Творчество и искусство' }
        ],
        likeCount: 1000000,
        createdAt: 'сегодня'
      };
    });
  };
  // Здесь будет запрос ( в нашем случае подгрузка) данных + стоит setTimeout для проверки работы
  const fetchData = () => {
    setTimeout(() => {
      // За один запрос генерируется 20 карточек по умолчанию
      const newCards = generateMockCards(cards.length, 20);
      setCards((prevCards) => [...prevCards, ...newCards]);

      if (cards.length + newCards.length >= 100) {
        setHasMore(false);
      }
    }, 2000);
  };

  useEffect(() => {
    const initialCards = generateMockCards(0, 40);
    setCards(initialCards);
  }, []);

  return (
    <div className={styles.infinite__grid}>
      <Title as='h2'> {title} </Title>
      <InfiniteScroll
        dataLength={cards.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Preloader />}
        scrollThreshold={0.8}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.infinite__grid__container}>
          {cards.map((card) => (
            <SkillCard
              key={card.id}
              userName={card.name}
              userCity={card.city}
              userDateofBirth={card.dateOfBirth}
              userSkillCategory={card.can.category}
              userSkillName={card.can.title}
              userPhotoUrl={card.image}
              skillsToLearn={card.want}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
