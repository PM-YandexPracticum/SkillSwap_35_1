import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
  component: Title
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

export const SelectStoryTitle: Story = {
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4'],
      control: { type: 'select' }
    },

    align: {
      options: ['center', 'left'],
      control: { type: 'select' }
    },

    color: {
      options: ['mainColorText', 'accentColorDark'],
      control: { type: 'select' }
    }
  },
  render: (args) => {
    return <Title {...args}>Добро пожаловать в SkillSwap!</Title>;
  }
};
