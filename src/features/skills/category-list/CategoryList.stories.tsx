import type { Meta, StoryObj } from '@storybook/react';
import { CategoryList } from './CategoryList';

const meta: Meta<typeof CategoryList> = {
  component: CategoryList
};

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const SelectStory: Story = {
  render: () => {
    const onClick = (categories: string[]) => {
      alert(categories);
    }
    return (
      <div style={{border: '1px solid black', borderRadius: '12px', width: '1136px'}}>
        <CategoryList onClick={onClick}/>
      </div>
    );
  }
};
