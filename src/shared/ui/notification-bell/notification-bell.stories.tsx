import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBell } from './notification-bell';

const meta: Meta<typeof NotificationBell> = {
  component: NotificationBell
};

export default meta;

type Story = StoryObj<typeof NotificationBell>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex' }}>
        <NotificationBell hasNew={false} />
      </div>
    );
  }
};

export const WithNewNotification: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex' }}>
        <NotificationBell hasNew={true} />
      </div>
    );
  }
};
