// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import ImageInput from './ImageInput';

const meta: Meta<typeof ImageInput> = {
  title: 'Components/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Разрешить множественный выбор файлов',
      defaultValue: true
    },
    onFilesChange: {
      action: 'filesChanged',
      description: 'Callback при изменении выбранных файлов'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ImageInput>;

// Базовый ImageInput
export const Standard: Story = {
  args: {
    multiple: true
  }
};
