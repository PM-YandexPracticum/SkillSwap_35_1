import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  component: Text
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const SelectStoryText: Story = {
  argTypes: {
    tag: {
      options: ['div', 'p', 'span'],
      control: { type: 'select' }
    },

    size: {
      options: ['main', 'details'],
      control: { type: 'select' }
    },

    color: {
      options: [
        'mainColorText',
        'tertiaryColorDark',
        'tertiaryColorLight',
        'accentColorDark',
        'colorError'
      ],
      control: { type: 'select' }
    },

    family: {
      options: ['main', 'userName'],
      control: { type: 'select' }
    },

    align: {
      options: ['center', 'left'],
      control: { type: 'select' }
    }
  },
  render: (args) => {
    return <Text {...args}>Творчество и искусство</Text>;
  }
};
