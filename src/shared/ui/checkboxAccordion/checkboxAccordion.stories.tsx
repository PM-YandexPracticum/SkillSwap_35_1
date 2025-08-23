import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxAccordion } from './checkboxAccordion';
import type { CheckboxAccordionItem } from './type';

const meta: Meta<typeof CheckboxAccordion> = {
  component: CheckboxAccordion
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultState = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      label: 'Рисование и иллюстрация',
      value: 'drawing',
      checked: false
    },
    { id: '2', label: 'Фотография', value: 'photography', checked: false },
    { id: '3', label: 'Видеомонтаж', value: 'video', checked: false }
  ]);

  const updateListItems = (updatedItems: CheckboxAccordionItem[]) => {
    setItems(updatedItems);
  };

  return (
    <div style={{ padding: '20px', width: '400px' }}>
      <CheckboxAccordion
        label='Творчество и искусство'
        groupName='arts'
        items={items}
        onItemsChange={updateListItems}
      />
    </div>
  );
};
