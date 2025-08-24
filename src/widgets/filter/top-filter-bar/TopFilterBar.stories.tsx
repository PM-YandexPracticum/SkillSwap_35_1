import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TopFilterBar } from './TopFilterBar';
import {
  initialState,
  SkillSlice
} from '../../../app/services/slices/skillsSlice';

const meta: Meta<typeof TopFilterBar> = {
  title: 'Components/TopFilterBar',
  component: TopFilterBar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TopFilterBar>;

// Базовый store для дефолтной истории
const createStore = (filters = {}) =>
  configureStore({
    reducer: {
      skills: SkillSlice.reducer
    },
    preloadedState: {
      skills: {
        ...initialState,
        filters: {
          ...initialState.filters,
          ...filters
        }
      }
    }
  });

// История без фильтров
export const Empty: Story = {
  decorators: [
    (Story) => {
      const store = createStore();

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ]
};

// История только с городами
export const OnlyCities: Story = {
  decorators: [
    (Story) => {
      const store = createStore({
        subcategories: [],
        cities: ['Moscow', 'Novosibirsk', 'Kazan'],
        gender: 'Не имеет значения',
        searchTarget: 'Всё'
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ]
};

// История со всеми типами фильтров
export const AllFilters: Story = {
  decorators: [
    (Story) => {
      const store = createStore({
        subcategories: ['Дизайн', 'Программирование'],
        cities: ['Moscow', 'SaintP'],
        gender: 'Мужской',
        searchTarget: 'Услуги'
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ]
};

