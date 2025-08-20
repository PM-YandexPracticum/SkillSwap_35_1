// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LikeButton } from './likeButton';
import type { LikeButtonUIProps } from './type';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
  argTypes: {
    liked: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

// Базовый LikeButton (не лайкнутый)
export const StandardLike: Story = {
  args: {
    liked: false
  }
};

// Лайкнутый LikeButton
export const LikedButton: Story = {
  args: {
    liked: true
  }
};

// Интерактивный LikeButton с локальным состоянием
export const ToggleLike = {
  render: () => {
    const [liked, setLiked] = useState(false);
    const handleClick = () => setLiked(prev => !prev);

    return <LikeButton liked={liked} onClick={handleClick} />;
  }
};
