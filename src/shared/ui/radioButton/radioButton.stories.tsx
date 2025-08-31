// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton } from './radioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    checked: {
      control: 'boolean'
    },
    onChange: {
      action: 'changed'
    }
  }
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

// Базовый пример
export const StandardRadio: Story = {
  args: {
    id: 'radio-1',
    name: 'radio-group',
    value: 'option1',
    children: 'Option 1',
    checked: false,
    disabled: false
  }
};

// Группа радио-кнопок
export const RadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RadioButton
        id='option1'
        name='options'
        value='option1'
        checked={selectedValue === 'option1'}
        onChange={handleChange}
      >
        First Option
      </RadioButton>
      <RadioButton
        id='option2'
        name='options'
        value='option2'
        checked={selectedValue === 'option2'}
        onChange={handleChange}
      >
        Second Option
      </RadioButton>
      <RadioButton
        id='option3'
        name='options'
        value='option3'
        checked={selectedValue === 'option3'}
        disabled
        onChange={handleChange}
      >
        Third Option (Disabled)
      </RadioButton>
    </div>
  );
};

// Все состояния
export const AllStates: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (value: string) => {
      setSelectedValue(value);
      console.log(selectedValue);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <RadioButton
          id='unchecked'
          name='states'
          value='unchecked'
          checked={selectedValue === 'unchecked'}
          onChange={handleChange}
        >
          Unchecked
        </RadioButton>
        <RadioButton
          id='checked'
          name='states'
          value='checked'
          checked={selectedValue === 'checked'}
          onChange={handleChange}
        >
          Checked
        </RadioButton>
        <RadioButton
          id='disabled-unchecked'
          name='states'
          value='disabled-unchecked'
          checked={selectedValue === 'disabled-unchecked'}
          disabled
          onChange={handleChange}
        >
          Disabled Unchecked
        </RadioButton>
        <RadioButton
          id='disabled-checked'
          name='states'
          value='disabled-checked'
          checked={selectedValue === 'disabled-checked'}
          disabled
          onChange={handleChange}
        >
          Disabled Checked
        </RadioButton>
      </div>
    );
  }
};
