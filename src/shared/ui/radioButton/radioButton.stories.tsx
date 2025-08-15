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
    label: 'Option 1',
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
        label='First Option'
        onChange={handleChange}
      />
      <RadioButton
        id='option2'
        name='options'
        value='option2'
        checked={selectedValue === 'option2'}
        label='Second Option'
        onChange={handleChange}
      />
      <RadioButton
        id='option3'
        name='options'
        value='option3'
        checked={selectedValue === 'option3'}
        label='Third Option (Disabled)'
        disabled
        onChange={handleChange}
      />
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
          label='Unchecked'
          checked={selectedValue === 'unchecked'}
          onChange={handleChange}
        />
        <RadioButton
          id='checked'
          name='states'
          value='checked'
          label='Checked'
          checked={selectedValue === 'checked'}
          onChange={handleChange}
        />
        <RadioButton
          id='disabled-unchecked'
          name='states'
          value='disabled-unchecked'
          label='Disabled Unchecked'
          checked={selectedValue === 'disabled-unchecked'}
          disabled
          onChange={handleChange}
        />
        <RadioButton
          id='disabled-checked'
          name='states'
          value='disabled-checked'
          label='Disabled Checked'
          checked={selectedValue === 'disabled-checked'}
          disabled
          onChange={handleChange}
        />
      </div>
    );
  }
};
