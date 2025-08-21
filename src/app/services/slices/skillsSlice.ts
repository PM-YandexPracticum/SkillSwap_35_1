/* eslint-disable no-param-reassign */
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
    categories: string[];
    subcategories: string[];
    gender: string;
    city: string;
    canTeach: ISkill | null;
    wantToLearn: IDesiredSkill[];
  };
}

const initialState: TSkillsState = {
  skills: [],
  filters: {
    categories: [],
    subcategories: [],
    gender: '',
    city: '',
    canTeach: null,
    wantToLearn: []
  }
};

export const SkillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<IUserPublic[]>) => {
      state.skills = action.payload;
    },

    addCategory: (state, action: PayloadAction<string>) => {
      state.filters.categories.push(action.payload);
      state.filters.subcategories = [];
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      state.filters.categories = state.filters.categories.filter(
        (cat) => cat !== action.payload
      );
    },

    addSubcategory: (state, action: PayloadAction<string>) => {
      state.filters.subcategories.push(action.payload);
    },

    removeSubcategory: (state, action: PayloadAction<string>) => {
      state.filters.subcategories = state.filters.subcategories.filter(
        (subcat) => subcat !== action.payload
      );
    },

    setGender: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
    },

    setCity: (state, action: PayloadAction<string>) => {
      state.filters.city = action.payload;
    },

    setCanTeach: (state, action: PayloadAction<ISkill | null>) => {
      state.filters.canTeach = action.payload;
    },

    setWantToLearn: (state, action: PayloadAction<IDesiredSkill[]>) => {
      state.filters.wantToLearn = action.payload;
    },

    clearAllFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  selectors: {
    getSkills: (state) => state.skills,
    getFilters: (state) => state.filters,

    getFilteredSkills: (state) => {
      let filteredUsers = state.skills;
      const { categories, subcategories, gender, city, canTeach, wantToLearn } =
        state.filters;

      if (categories.length > 0) {
        filteredUsers = filteredUsers.filter((user) =>
          categories.includes(user.can.category)
        );
      }

      if (subcategories.length > 0) {
        filteredUsers = filteredUsers.filter((user) =>
          subcategories.includes(user.can.subcategory)
        );
      }

      if (gender) {
        filteredUsers = filteredUsers.filter((user) => user.gender === gender);
      }

      if (city) {
        filteredUsers = filteredUsers.filter((user) => user.city === city);
      }

      if (canTeach) {
        filteredUsers = filteredUsers.filter(
          (user) => user.can.title === canTeach.title
        );
      }

      if (wantToLearn.length > 0) {
        filteredUsers = filteredUsers.filter((user) =>
          wantToLearn.some((desiredSkill) =>
            user.want.some(
              (userSkill) =>
                userSkill.category === desiredSkill.category &&
                userSkill.subcategory === desiredSkill.subcategory
            )
          )
        );
      }

      return filteredUsers;
    },

    getSkillById: (state) => (id: string) =>
      state.skills.find((user) => user.id === id)
  }
});

export const {
  setSkills,
  addCategory,
  removeCategory,
  addSubcategory,
  removeSubcategory,
  setGender,
  setCity,
  setCanTeach,
  setWantToLearn,
  clearAllFilters
} = SkillSlice.actions;

export const { getSkills, getFilters, getFilteredSkills, getSkillById } =
  SkillSlice.selectors;

export default SkillSlice.reducer;
