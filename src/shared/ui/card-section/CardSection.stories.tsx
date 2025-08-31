import type { Meta, StoryObj } from '@storybook/react';
import { CardSection } from './CardSection';
import type { IUserPublic } from "src/entities/user/model/types/types";

// Mock данные
const mockData: IUserPublic[] = [
  {
    id: '1',
    name: 'Иван Иванов',
    about: 'Опытный дизайнер с 5-летним стажем, специализируюсь на UI/UX',
    gender: 'Мужской',
    dateOfBirth: '1990-05-15',
    city: 'Москва',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    can: {
      category: 'Дизайн',
      subcategory: 'UI/UX',
      title: 'UI/UX дизайнер',
      description:
        'Создаю интуитивные и красивые интерфейсы для веб и мобильных приложений',
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
      ]
    },
    want: [
      { category: 'Программирование', subcategory: 'Frontend' },
      { category: 'Маркетинг', subcategory: 'SMM' }
    ],
    likeCount: 24,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Мария Петрова',
    about: 'Frontend разработчик с опытом работы в крупных IT компаниях',
    gender: 'Женский',
    dateOfBirth: '1988-12-20',
    city: 'Санкт-Петербург',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    can: {
      category: 'Программирование',
      subcategory: 'Frontend',
      title: 'Frontend разработчик',
      description:
        'Разрабатываю современные веб-приложения на React и TypeScript',
      images: [
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400',
        'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400'
      ]
    },
    want: [
      { category: 'Дизайн', subcategory: 'Графический дизайн' },
      { category: 'Английский язык', subcategory: 'Разговорный' }
    ],
    likeCount: 18,
    createdAt: '2024-02-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'Алексей Сидоров',
    about: 'Digital маркетолог, помогаю бизнесу расти в интернете',
    gender: 'Мужской',
    dateOfBirth: '1995-08-10',
    city: 'Казань',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    can: {
      category: 'Маркетинг',
      subcategory: 'Digital',
      title: 'Digital маркетолог',
      description: 'Специализируюсь на контекстной рекламе, SEO и SMM',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?w=400'
      ]
    },
    want: [
      { category: 'Аналитика', subcategory: 'Веб-аналитика' },
      { category: 'Программирование', subcategory: 'Python' }
    ],
    likeCount: 32,
    createdAt: '2024-03-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'Елена Васильева',
    about: 'Преподаватель английского с международными сертификатами',
    gender: 'Женский',
    dateOfBirth: '1992-03-25',
    city: 'Новосибирск',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    can: {
      category: 'Образование',
      subcategory: 'Языки',
      title: 'Преподаватель английского',
      description:
        'Помогаю достичь свободного владения английским для работы и путешествий',
      images: [
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400'
      ]
    },
    want: [
      { category: 'Дизайн', subcategory: 'Графический дизайн' },
      { category: 'Психология', subcategory: 'Коучинг' }
    ],
    likeCount: 15,
    createdAt: '2024-01-28T16:45:00Z'
  }
];

const meta: Meta<typeof CardSection> = {
  title: 'Components/CardSection',
  component: CardSection,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок секции'
    },
    linkSeeAll: {
      control: 'text',
      description: 'Ссылка для кнопки "Смотреть все"'
    },
    data: {
      control: 'object',
      description: 'Массив данных для карточек'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CardSection>;

// Базовый пример
export const Default: Story = {
  args: {
    title: 'Популярные навыки',
    data: mockData,
    linkSeeAll: '/all-skills'
  }
};
