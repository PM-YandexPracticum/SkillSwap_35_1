// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LikeButton } from './likeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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
export const Interactive: Story = {
  render: function Render() {
    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
      setIsLiked(prev => !prev);
    };

    return (
      <LikeButton
        liked={isLiked}
        onClick={handleClick}
      />
    );
  }
};

// Все состояния в одном месте
export const AllStates = () => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <LikeButton liked={false} onClick={() => {}} />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Неактивный</p>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <LikeButton liked={true} onClick={() => {}} />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Активный</p>
      </div>
    </div>
  );
};