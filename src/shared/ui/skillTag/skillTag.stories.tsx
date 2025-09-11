// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { SkillTag } from './skillTag';

const meta: Meta<typeof SkillTag> = {
  title: 'Components/SkillTag',
  component: SkillTag,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Название навыка'
    },
    category: {
      control: 'select',
      options: ['Иностранные языки', 'Бизнес и карьера', 'Творчество и искусство', 'other'],
      description: 'Категория навыка'
    },
    isCountExtra: {
      control: 'boolean',
      description: 'Флаг для отображения количества дополнительных навыков',
    }
  }
};

export default meta;
type Story = StoryObj<typeof SkillTag>;

export const LanguageSkill: Story = {
  args: {
    name: 'английский язык',
    category: 'Иностранные языки',
    isCountExtra: false
  }
};

export const BusinessSkill: Story = {
  args: {
    name: 'Управление проектами',
    category: 'Бизнес и карьера',
    isCountExtra: false
  }
};

export const CreativeSkill: Story = {
  args: {
    name: 'Игра на барабанах',
    category: 'Творчество и искусство',
    isCountExtra: false
  }
};

export const ExtraSkillsCount: Story = {
  args: {
    name: '3',
    category: 'other',
    isCountExtra: true
  }
};
