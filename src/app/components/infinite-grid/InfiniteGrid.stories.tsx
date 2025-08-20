import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteGrid } from './InfiniteGrid';

const meta = {
  title: 'Components/InfiniteGrid',
  component: InfiniteGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент бесконечной прокрутки с карточками пользователей. Подгружает данные по мере скролла.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Если бы были пропсы, мы бы их описали здесь
  }
} satisfies Meta<typeof InfiniteGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// История с начальной загрузкой
export const WithInitialLoad: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Компонент с первоначальной загрузкой 18 карточек. Скроллите вниз для подгрузки новых данных.'
      }
    }
  }
};
