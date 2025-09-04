import type { Meta, StoryObj } from '@storybook/react';
import { OfferConfirmation } from './OfferConfirmation';
import IconDone from '@icons/ui/Done.svg?react';
import IconUserCircle from '@icons/ui/user-circle.svg?react';
import IconNotification from '@icons/ui/notification.svg?react';

const meta: Meta<typeof OfferConfirmation> = {
  title: 'Components/OfferConfirmation',
  component: OfferConfirmation,
  decorators: [
    (Story) => (
      <div
        style={{
          paddingTop: '50px',
          paddingBottom: '50px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#fafafa'
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof OfferConfirmation>;

// окно с иконкой "Done"
export const DoneIcon: Story = {
  args: {
    icon: <IconDone />,
    title: 'Важе предложение создано',
    description: 'Теперь вы можете предложить обмен',
    onEdit: () => alert('Кликнули на Готово')
  }
};

// окно с иконкой "User Circle"
export const UserCircleIcon: Story = {
  args: {
    icon: <IconUserCircle />,
    title: 'Важе предложение создано',
    description: 'Теперь вы можете предложить обмен',
    onEdit: () => alert('Кликнули на Готово')
  }
};

// окно с иконкой "Notification"
export const NotificationIcon: Story = {
  args: {
    icon: <IconNotification />,
    title: 'Вы предложили обмен',
    description: 'Теперь дождитесь подтверждения. Вам придёт уведомление',
    onEdit: () => alert('Кликнули на Готово')
  }
};
