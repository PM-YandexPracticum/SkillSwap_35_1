import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './notification';

const meta: Meta<typeof Notification> = {
  component: Notification
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const SelectStory: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex'}}>
        <Notification
          text='Олег предлагает вам обмен'
          onClose={() => alert('Close clicked')}
        />
      </div>
    );
  }
};
