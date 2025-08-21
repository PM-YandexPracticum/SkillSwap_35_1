import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  IDesiredSkill,
  ISkill,
  IUserPublic
} from 'src/entities/types/types';

export interface TSkillsState {
  skills: IUserPublic[];
  filters: {
    category: string[];
    subcategory: string[];
    gender: string;
    city: string;
    can: ISkill | null;
    want: IDesiredSkill[];
  };
}

const initialState: TSkillsState = {
  skills: [],
  filters: {
    category: [],
    subcategory: [],
    gender: '',
    city: '',
    can: null,
    want: []
  }
};

export const SkillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<IUserPublic[]>) => {
      state.skills = action.payload;
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.category.indexOf(category);
      if (index === -1) {
        state.filters.category.push(category);
      } else {
        state.filters.category.splice(index, 1);
      }
      state.filters.subcategory = [];
    },
    toggleSubcategoryFilter: (state, action: PayloadAction<string>) => {
      const subcategory = action.payload;
      const index = state.filters.subcategory.indexOf(subcategory);
      if (index === -1) {
        state.filters.subcategory.push(subcategory);
      } else {
        state.filters.subcategory.splice(index, 1);
      }
    },
    setGenderFilter: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
    },
    setCityFilter: (state, action: PayloadAction<string>) => {
      state.filters.city = action.payload;
    },
    setCanFilter: (state, action: PayloadAction<ISkill | null>) => {
      state.filters.can = action.payload;
    },
    setWantFilter: (state, action: PayloadAction<IDesiredSkill[]>) => {
      state.filters.want = action.payload;
    }
  },
  selectors: {
    getSkills: (state) => state.skills,
    getFilters: (state) => state.filters,
    getFilteredSkills: (state) => {
      const { skills, filters } = state;
      return skills.filter((user) => {
        const matchesCategory =
          filters.category.length === 0 ||
          filters.category.includes(user.can.category);
        const matchesSubcategory =
          filters.subcategory.length === 0 ||
          filters.subcategory.includes(user.can.subcategory);
        const matchesGender =
          filters.gender === '' || user.gender === filters.gender;
        const matchesCity = filters.city === '' || user.city === filters.city;
        const matchesCan = !filters.can || user.can.title === filters.can.title;
        const matchesWant =
          filters.want.length === 0 ||
          filters.want.some((desiredSkill) =>
            user.want.some(
              (userDesiredSkill) =>
                userDesiredSkill.category === desiredSkill.category &&
                userDesiredSkill.subcategory === desiredSkill.subcategory
            )
          );
        return (
          matchesCategory &&
          matchesSubcategory &&
          matchesGender &&
          matchesCity &&
          matchesCan &&
          matchesWant
        );
      });
    },
    getSkillById: (state) => (id: string) =>
      state.skills.find((user) => user.id === id)
  }
});

export const {
  setSkills,
  toggleCategoryFilter,
  toggleSubcategoryFilter,
  setGenderFilter,
  setCityFilter,
  setCanFilter,
  setWantFilter
} = SkillSlice.actions;

export const { getSkills, getFilters, getFilteredSkills, getSkillById } =
  SkillSlice.selectors;

export default SkillSlice.reducer;
