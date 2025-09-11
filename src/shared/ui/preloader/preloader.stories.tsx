import type { Meta, StoryObj } from '@storybook/react';
import { Preloader } from './preloader';

const meta: Meta<typeof Preloader> = {
  title: 'ui/Preloader',
  component: Preloader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Preloader>;

export const Default: Story = {};