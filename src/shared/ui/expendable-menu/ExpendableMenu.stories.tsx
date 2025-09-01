import type { Meta, StoryObj } from '@storybook/react';
import ExpendableMenu from './ExpendableMenu';
import { Checkbox } from '@ui/checkbox/checkbox';
import { RadioButton } from '@ui/radioButton/radioButton';

const meta: Meta<typeof ExpendableMenu> = {
  title: 'Shared/ExpendableMenu',
  component: ExpendableMenu,
};
export default meta;

type Story = StoryObj<typeof ExpendableMenu>;

export const WithCheckboxes: Story = {
  args: {
    maxCount: 3,
    collapsedLabel: 'Все города',
    children: ['Москва', 'Санкт-Петербург', 'Казань', 'Пермь', 'Ярославль'].map((c) => (
      <Checkbox key={c} checked={false} onChange={() => {}}>
        {c}
      </Checkbox>
    )),
  },
};

export const WithRadios: Story = {
  args: {
    maxCount: 2,
    collapsedLabel: 'Не имеет значения',
    children: ['Не имеет значения', 'Мужской', 'Женский'].map((g) => (
      <RadioButton
        key={g}
        id={`gender-${g}`}
        name="gender"
        value={g}
        checked={g === 'Не имеет значения'}
        onChange={() => {}}
      />
    )),
  },
};
