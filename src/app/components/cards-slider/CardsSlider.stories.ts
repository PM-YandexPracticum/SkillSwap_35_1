import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsSlider } from './CardsSlider';
import type { IUserPublic } from '../../../entities/types/types';

// Mock данные
const mockData: IUserPublic[] = [
  {
    id: '11-10-0-1756213001262',
    name: 'Максим',
    city: 'Москва',
    dateOfBirth: '03.02.1999',
    gender: 'Мужской',
    image: 'db/photos/user3.jpg',
    about: 'Люблю вкусную еду и хорошие игры.',
    can: {
      title: 'Как собрать что-то своими руками?',
      category: 'Творчество и искусство',
      subcategory: 'Декор и DIY',
      description:
        'Научу работать руками и собирать предметы для собственного дома.',
      images: [
        'db/skills/diy1.jpg',
        'db/skills/diy2.png',
        'db/skills/diy3.png',
        'db/skills/diy4.png',
        'db/skills/diy5.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Дом и уют',
        subcategory: 'Домашние растения'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Рисование и иллюстрация'
      }
    ],
    createdAt: '2025.08.21',
    likeCount: 2
  },
  {
    id: '12-11-0-1756213001262',
    name: 'Алла',
    city: 'Архангельск',
    dateOfBirth: '02.05.1995',
    gender: 'Женский',
    image: 'db/photos/user4.jpg',
    about: 'Люблю ходить по магазинам и заниматься спортом.',
    can: {
      title: 'Получаем знания и быстро во Францию',
      category: 'Иностранные языки',
      subcategory: 'Французский',
      description: 'Научусь разговаривать на французском с нуля.',
      images: [
        'db/skills/france1.jpg',
        'db/skills/france2.jpg',
        'db/skills/france3.jpg',
        'db/skills/france4.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Испанский'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Осознанность'
      }
    ],
    createdAt: '2025.08.22',
    likeCount: 2
  },
  {
    id: '13-12-0-1756213001262',
    name: 'Дарья',
    city: 'Ярославль',
    dateOfBirth: '01.05.1997',
    gender: 'Женский',
    image: 'db/photos/user5.jpg',
    about: 'Люблю работать и усердно учиться.',
    can: {
      title: 'Как правильно подготовить резюме?',
      category: 'Бизнес и карьера',
      subcategory: 'Резюме и собеседование',
      description:
        'Научу заполнять резюме, чтобы оно было заметно и интересно.',
      images: [
        'db/skills/resume1.jpg',
        'db/skills/resume2.png',
        'db/skills/resume3.svg',
        'db/skills/resume4.svg',
        'db/skills/resume5.svg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Бизнес и карьера',
        subcategory: 'Управление командой'
      },
      {
        category: 'Образование и развитие',
        subcategory: 'Личностное развитие'
      }
    ],
    createdAt: '2025.08.23',
    likeCount: 1
  },
  {
    id: '14-13-0-1756213001262',
    name: 'Екатерина',
    city: 'Пермь',
    dateOfBirth: '21.05.1986',
    gender: 'Женский',
    image: 'db/photos/user6.jpg',
    about: 'Постоянно развиваюсь и путешествую.',
    can: {
      title: 'Давно мечтал об Октоберфесте?',
      category: 'Иностранные языки',
      subcategory: 'Немецкий',
      description:
        'Научу разговаривать на немецком языке, опыт преподавания 5 лет.',
      images: [
        'db/skills/germany1.jpg',
        'db/skills/germany2.jpg',
        'db/skills/germany3.jpg',
        'db/skills/germany4.jpg',
        'db/skills/germany5.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Английский'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Питание и ЗОЖ'
      },
      {
        category: 'Бизнес и карьера',
        subcategory: 'Маркетинг и реклама'
      }
    ],
    createdAt: '2025.08.24',
    likeCount: 3
  },
  {
    id: '15-14-0-1756213001262',
    name: 'Елена',
    city: 'Красноярск',
    dateOfBirth: '21.05.1989',
    gender: 'Женский',
    image: 'db/photos/user7.jpg',
    about: 'Люблю ходить по клубам и ездить на машине.',
    can: {
      title: 'Давно планировал купить растения домой?',
      category: 'Дом и уют',
      subcategory: 'Домашние растения',
      description: 'Научу ухаживать за домашними растениями.',
      images: [
        'db/skills/plant1.png',
        'db/skills/plant2.png',
        'db/skills/plant3.jpg',
        'db/skills/plant4.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Дом и уют',
        subcategory: 'Домашние финансы'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Декор и DIY'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Баланс жизни и работы'
      }
    ],
    createdAt: '2025.08.25',
    likeCount: 3
  },
  {
    id: '16-15-0-1756213001262',
    name: 'София',
    city: 'Абакан',
    dateOfBirth: '21.05.1984',
    gender: 'Женский',
    image: 'db/photos/user8.jpg',
    about: 'Люблю отдыхать и постоянно развиваться.',
    can: {
      title: 'Помогу найти путь как к себе прийти',
      category: 'Здоровье и лайфстайл',
      subcategory: 'Йога и медитация',
      description: 'Помогу научиться медитировать и обретать покой.',
      images: [
        'db/skills/yoga1.jpg',
        'db/skills/yoga2.jpg',
        'db/skills/yoga3.jpg',
        'db/skills/yoga4.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Ментальное здоровье'
      },
      {
        category: 'Образование и развитие',
        subcategory: 'Когнитивные техники'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Китайский'
      }
    ],
    createdAt: '2025.08.25',
    likeCount: 2
  },
  {
    id: '1-0-1-1756213001262',
    name: 'Иван',
    city: 'Санкт-Петербург',
    dateOfBirth: '20.02.1989',
    image: 'db/photos/user1.jpg',
    gender: 'Мужской',
    about: 'Люблю путешествовать и быстрые машины.',
    can: {
      title: 'Продажи и полезные навыки',
      category: 'Бизнес и карьера',
      subcategory: 'Продажи и переговоры',
      description: 'Научусь продажам и переговорам с нуля.',
      images: [
        'db/skills/sell1.jpg',
        'db/skills/sell2.jpg',
        'db/skills/sell3.jpg',
        'db/skills/sell4.jpg',
        'db/skills/sell5.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Йога и медитация'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Английский'
      }
    ],
    createdAt: '2025.06.13',
    likeCount: 2
  },
  {
    id: '2-1-1-1756213001262',
    name: 'Анна',
    city: 'Казань',
    dateOfBirth: '05.10.1996',
    gender: 'Женский',
    image: 'db/photos/user2.jpg',
    about: 'Люблю модно одеваться и играть в шахматы.',
    can: {
      title: 'Наведение порядка',
      category: 'Дом и уют',
      subcategory: 'Уборка и организация',
      description: 'Научу наводить чистоту и порядок в доме.',
      images: [
        'db/skills/cleaning1.jpeg',
        'db/skills/cleaning2.jpg',
        'db/skills/cleaning3.jpg',
        'db/skills/cleaning4.jpg',
        'db/skills/cleaning5.jpeg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Французский'
      },
      {
        category: 'Здоровье и лайфстайл',
        subcategory: 'Питание и ЗОЖ'
      }
    ],
    createdAt: '2025.05.14',
    likeCount: 1
  },
  {
    id: '3-2-1-1756213001262',
    name: 'Максим',
    city: 'Москва',
    dateOfBirth: '03.02.1999',
    gender: 'Мужской',
    image: 'db/photos/user3.jpg',
    about: 'Люблю вкусную еду и хорошие игры.',
    can: {
      title: 'Игра на барабанах',
      category: 'Творчество и искусство',
      subcategory: 'Музыка и звук',
      description:
        'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
      images: [
        'db/skills/music1.jpg',
        'db/skills/music2.jpg',
        'db/skills/music3.jpg',
        'db/skills/music4.jpg',
        'db/skills/music5.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Образование и развитие',
        subcategory: 'Скорочтение'
      },
      {
        category: 'Иностранные языки',
        subcategory: 'Японский'
      }
    ],
    createdAt: '2025.04.15',
    likeCount: 2
  },
  {
    id: '4-3-1-1756213001262',
    name: 'Алла',
    city: 'Архангельск',
    dateOfBirth: '02.05.1995',
    gender: 'Женский',
    image: 'db/photos/user4.jpg',
    about: 'Люблю ходить по магазинам и заниматься спортом.',
    can: {
      title: 'Полезные навыки',
      category: 'Дом и уют',
      subcategory: 'Ремонт',
      description: 'Научусь делать ремонт дома с нуля.',
      images: [
        'db/skills/repair1.jpg',
        'db/skills/repair2.jpg',
        'db/skills/repair3.jpg',
        'db/skills/repair4.jpg',
        'db/skills/repair5.jpg'
      ]
    },
    want: [
      {
        category: 'Дом и уют',
        subcategory: 'Приготовление еды'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Фотография'
      },
      {
        category: 'Творчество и искусство',
        subcategory: 'Декор и DIY'
      },
      {
        category: 'Образование и развитие',
        subcategory: 'Личностное развитие'
      }
    ],
    createdAt: '2025.08.12',
    likeCount: 100
  }
];

const meta: Meta<typeof CardsSlider> = {
  title: 'Components/CardSlider',
  component: CardsSlider,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок секции'
    },
    skillsList: {
      control: 'object',
      description: 'Массив данных для карточек'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CardsSlider>;

// Базовый пример
export const Default: Story = {
  args: {
    title: 'Похожее',
    skillsList: mockData
  }
};
