import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import DatePicker from './datePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/Input',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onBack: { action: 'back clicked' },
    onSave: { action: 'save clicked' }
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
    );

    return (
      <div style={{ width: 300 }}>
        <DatePicker
          {...args}
          selectedDate={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
      </div>
    );
  }
};
