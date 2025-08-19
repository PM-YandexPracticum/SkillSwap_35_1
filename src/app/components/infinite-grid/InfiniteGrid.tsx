import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '@ui/title/Title';
import styles from './Infinite.module.scss';

// Интерфейс для заглушки
interface IUserData {
  id: number;
  name: {
    first: string;
    last: string;
  };
  gender: string;
}

export const InfiniteGrid = () => {
  // Данные пользователей, для рендера карточки
  const [users, setUsers] = useState<IUserData[]>([]);
  // Флаг - есть ли еще не загруженные данные
  const [hasMore, setHasMore] = useState(true);

  // Заглушка для проверки моковых данных
  const generateMockUsers = (startIndex: number, count = 9): IUserData[] => {
    const firstNames = ['Алексей', 'Мария', 'Иван', 'Екатерина'];
    const lastNames = ['Иванов', 'Петрова', 'Сидоров', 'Смирнова'];

    return Array.from({ length: count }, (_, i) => {
      const id = startIndex + i;
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const gender = Math.random() > 0.5 ? 'male' : 'female';

      return {
        id,
        name: {
          first: firstName,
          last: lastName
        },
        gender
      };
    });
  };
  // Здесь будет запрос ( в нашем случае подгрузка) данных + стоит setTimeout для проверки работы
  const fetchData = () => {
    setTimeout(() => {
      // За один запрос генерируется 9 карточек по умолчанию
      const newUsers = generateMockUsers(users.length, 9);
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);

      if (users.length + newUsers.length >= 36) {
        setHasMore(false);
      }
    }, 2000);
  };

  useEffect(() => {
    const initialUsers = generateMockUsers(0, 18);
    setUsers(initialUsers);
  }, []);

  return (
    <div className={styles.infinite__grid}>
      <Title as='h1'> Рекомендуем </Title>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Загружаем ещё пользователей...</p>}
        endMessage={<p>Вы просмотрели всех {users.length} пользователей</p>}
        scrollThreshold={0.8}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.infinite__grid__container}>
          {users.map((user) => (
            <div key={user.id} className={styles.infinite__grid__item}>
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>Пол: {user.gender === 'male' ? 'Мужской' : 'Женский'}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
