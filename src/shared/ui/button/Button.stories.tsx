import { type Meta, type StoryObj } from '@storybook/react-vite';
import Button from './Button';
import '../../../index.scss';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary']
    },
    disabled: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  render: (args) => (
    <Button {...args} style={{ width: '284px' }}>
      Primary
    </Button>
  ),
  args: { variant: 'primary', disabled: false }
};

export const Secondary: Story = {
  render: (args) => (
    <Button {...args} style={{ width: '200px' }}>
      Secondary
    </Button>
  ),
  args: { variant: 'secondary', disabled: false }
};

export const Tertiary: Story = {
  render: (args) => (
    <Button {...args} style={{ width: '200px' }}>
      Tertiary
    </Button>
  ),
  args: { variant: 'tertiary', disabled: false }
};
