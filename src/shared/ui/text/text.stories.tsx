import type { Meta, StoryObj } from '@storybook/react';
import { Text } from "./Text";

const meta = {
    component: Text
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectStoryText: Story = {
    args: {
        children: 'Творчество и искусство',
        as: 'div',
        size: 12,
    },

    argTypes: {
        as: {
            options: ['div', 'p', 'span'],
            control: {type: 'select'},
        },
        size: {
			options: [12, 16],
			control: { type: 'select' },
		},
        color: {
			options: ['textCaption', 'textDisabled', 'textLink', 'textError'],
			control: { type: 'select' },
		},
    },
    render: ({children, ...args}) => {
        return (
            <Text {...args}>{children}</Text>
        )
    }
}