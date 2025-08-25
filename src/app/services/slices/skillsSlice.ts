/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserPublic } from 'src/entities/types/types';
import { multiplyArrayElements } from '../../../utils';
import type { RootState } from '../store';
import type { IFilters } from '../../../shared/types/types';

export interface TSkillsState {
  skills: IUserPublic[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchQuery: string;
  filters: IFilters;
}

export const initialState: TSkillsState = {
  skills: [],
  loading: false,
  error: null,
  hasMore: true,
  searchQuery: '',
  filters: {
    subcategories: [],
    gender: 'Не имеет значения',
    cities: [],
    searchTarget: 'Всё'
  }
};

export const getMockSkills = createAsyncThunk(
  'skills/getMockCards',
  async (startIndex: number, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const response = await fetch('/db/users.json');
      const data: IUserPublic[] = await response.json();

      const skillsData = multiplyArrayElements(data);

      const pageSize = 20;
      const pageStart = startIndex;
      const pageEnd = startIndex + pageSize;

      if (pageStart >= skillsData.length) {
        return { skills: [], hasMore: false };
      }

      return {
        skills: skillsData.slice(pageStart, pageEnd),
        hasMore: true
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SkillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<IUserPublic[]>) => {
      state.skills = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilters>) => {
      state.filters = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<IFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearAllFilters: (state) => {
      state.filters = initialState.filters;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getMockSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMockSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.skills = [...state.skills, ...action.payload.skills];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getMockSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default SkillSlice.reducer;

export const {
  setSkills,
  setSearchQuery,
  setFilters,
  updateFilters,
  clearAllFilters
} = SkillSlice.actions;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSearchQuery = (state: RootState) => state.skills.searchQuery;
export const getFilters = (state: RootState) => state.skills.filters;
export const getHasMore = (state: RootState) => state.skills.hasMore;

export const getSkillById = (id: string) =>
  createSelector(getSkills, (skills) =>
    skills.find((skill) => skill.id === id)
  );

export const getFilteredSkills = createSelector(
  [getSkills, getFilters],
  (skills, filters) => {
    const { subcategories, gender, cities, searchTarget } = filters;
    let filtered = skills;
    if (gender !== 'Не имеет значения') {
      filtered = filtered.filter((skill) => skill.gender === gender);
    }
    if (cities.length > 0) {
      filtered = filtered.filter((skill) => cities.includes(skill.city));
    }
    if (subcategories.length > 0) {
      filtered = filtered.filter((skill) => {
        const can = skill.can && subcategories.includes(skill.can.subcategory);
        const want = skill.want.some((w) =>
          subcategories.includes(w.subcategory)
        );
        if (searchTarget === 'Хочу научиться') return can;
        if (searchTarget === 'Могу научить') return want;
        return can || want;
      });
    }
    return filtered;
  }
);

export const getNewSkills = createSelector(getSkills, (skills) =>
  [...skills].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
);

export const getPopularSkills = createSelector(getSkills, (skills) =>
  skills.filter((skill) => skill.likeCount >= 100)
);

export const getSimilarSkills = createSelector(
  [getSkills, (_, user: IUserPublic) => user],
  (skills, user) => {
    if (!user?.can?.subcategory) return [];

    return skills.filter(
      (skill) =>
        skill.can?.subcategory === user.can.subcategory && skill.id !== user.id
    );
  }
);
