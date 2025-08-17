import type { Meta, StoryObj } from '@storybook/react';
import { createElement, useState } from 'react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const SelectStory: Story = {
	render: () => 
	  createElement(() => {
		const [isChecked, setIsChecked] = useState(false);
		const [isMinusChecked, setIsMinusChecked] = useState(false);

		return (
		  <div style={{ display: 'flex', gap: '40px' }}>
		    <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)}>Стандартный вариант</Checkbox>
		    <Checkbox variant='minus' checked={isMinusChecked} onChange={() => setIsMinusChecked(!isMinusChecked)}>Вариант minus</Checkbox>
		  </div>
		);
	  }),
};
