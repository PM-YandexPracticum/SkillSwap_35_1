import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserPublic } from 'src/entities/types/types';

export interface TSkillsState {
  skills: IUserPublic[];
  filters: {
    category: string;
    subcategory: string;
  };
}

const initialState: TSkillsState = {
  skills: [],
  filters: {
    category: '',
    subcategory: ''
  }
};

export const SkillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<IUserPublic[]>) => {
      state.skills = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      state.filters.subcategory = '';
    },
    setSubcategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.subcategory = action.payload;
    }
  },
  selectors: {
    getSkills: (state) => state.skills,
    getFilters: (state) => state.filters,
    getFilteredSkills: (state) => {
      const { skills, filters } = state;
      return skills.filter((user) => {
        const matchesCategory =
          filters.category === '' || user.can.category === filters.category;
        const matchesSubcategory =
          filters.subcategory === '' ||
          user.can.subcategory === filters.subcategory;
        return matchesCategory && matchesSubcategory;
      });
    },
    getSkillById: (state, id: string) =>
      state.skills.find((user) => user.id === id)
  }
});

export const { setSkills, setCategoryFilter, setSubcategoryFilter } =
  SkillSlice.actions;
export const { getSkills, getFilters, getFilteredSkills, getSkillById } =
  SkillSlice.selectors;

export default SkillSlice.reducer;
