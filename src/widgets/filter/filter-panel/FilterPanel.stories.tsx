import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from './FilterPanel';
import type { IFilters } from '@shared-types/IFilters';
import { useState } from 'react';

const meta: Meta<typeof FilterPanel> = {
    component: FilterPanel,
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

export const SelectStory: Story = {
  render: () => {
    const styles: React.CSSProperties = {
      paddingTop: '50px',
      paddingBottom: '50px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: '#fafafa',
    };

    const initialState: IFilters = {
      subcategories: [],
      gender: 'Не имеет значения',
      cities: [],
      searchTarget: 'Всё'
    }

    const [filters, setFilters] = useState(initialState);
 
    const onReset = () => setFilters(initialState);

    return (
      <div style={styles}>
        <FilterPanel filters={filters} onChange={setFilters} onReset={onReset}/>
      </div>
    );
  },
};