import { type Meta, type StoryObj } from '@storybook/react-vite';
import GalleryEditIcon from '@icons/ui/gallery-edit.svg?react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    onButtonClick: { action: 'clicked' }
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/40'
  }
};

export const WithoutImage: Story = {
  args: {
    src: ''
  }
};

export const WithButton: Story = {
  args: {
    src: '',
    size: 'large',
    buttonIcon: GalleryEditIcon
  }
};
