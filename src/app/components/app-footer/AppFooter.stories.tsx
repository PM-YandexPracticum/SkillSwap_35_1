import type { Meta, StoryObj } from '@storybook/react';

import { AppFooter } from './AppFooter';

const meta: Meta<typeof AppFooter> = {
  component: AppFooter
};

export default meta;
type Story = StoryObj<typeof AppFooter>;

export const SelectStory: Story = {
  render: () => {
    return (
      <div
        style={{
          border: '1px solid black',
          overflowX: 'clip',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <AppFooter />
      </div>
    );
  }
};
