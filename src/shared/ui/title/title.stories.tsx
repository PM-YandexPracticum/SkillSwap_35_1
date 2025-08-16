import type { Meta, StoryObj } from '@storybook/react';
import { Title } from "./Title";

const meta = {
    component: Title,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectStoryTitle: Story = {
    args: {
        children: 'Добро пожаловать в SkillSwap!',
        as: 'h1',
        size: 32,
        align: 'left'
    },

    argTypes: {
        as: {
            options: ['h1', 'h2', 'h3', 'h4'],
            control: {type: 'select'},
        },
        size: {
			options: [16, 20, 24, 32],
			control: { type: 'select' },
		},
        align: {
			options: ['center', 'left'],
			control: { type: 'select' },
		},
        family: {
			options: ['Roboto', 'Jost'],
			control: { type: 'select' },
		},
    },
    render: ({children, ...args}) => {
        return (
            <Title {...args}>{children}</Title>
        )
    }
};

