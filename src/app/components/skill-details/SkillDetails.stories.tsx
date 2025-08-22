import type { Meta, StoryObj } from '@storybook/react';
import { SkillDetails } from './SkillDetails';

const meta: Meta<typeof SkillDetails> = {
    component: SkillDetails,
};

export default meta;
type Story = StoryObj<typeof SkillDetails>;

export const SelectStory: Story = {
  render: () => {
    const styles = {
      paddingTop: '50px',
      paddingBottom: '50px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
    };

    return (
      <div style={styles}>
        <SkillDetails />
      </div>
    );
  },
};