import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxAccordion } from './checkboxAccordion';
import type { CheckboxAccordionItem } from './type';

const meta: Meta<typeof CheckboxAccordion> = {
  component: CheckboxAccordion
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultState: Story = {
  render: () => {
    const [items, setItems] = useState([
      { value: 'Рисование и иллюстрация', checked: false },
      { value: 'Фотография', checked: false },
      { value: 'Видеомонтаж', checked: false }
    ]);

    const updateListItems = (updatedItems: CheckboxAccordionItem[]) => {
      setItems(updatedItems);
    };

    return (
      <div style={{ padding: '20px', width: '400px' }}>
        <CheckboxAccordion
          groupName="Творчество и искусство"
          items={items}
          onItemsChange={updateListItems}
        />
      </div>
    );
  }
};