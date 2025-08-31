/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { mockGetSkills, mockGetSkillById } from '../../../../api/mockApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserPublic } from 'src/entities/user/model/types/types';
import type { RootState } from '../../../../app/providers/store/store';
import type { IFilters } from '../../../../shared/types/IFilters';

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

export const loadSkills = createAsyncThunk(
  'skills/loadSkills',
  async (startIndex: number, { rejectWithValue }) => {
    try {
      const data = await mockGetSkills();

      const pageSize = 20;
      const pageEnd = startIndex + pageSize;

      return {
        skills: data.slice(startIndex, pageEnd),
        hasMore: pageEnd < data.length
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSkillById = createAsyncThunk<IUserPublic | null, string, { rejectValue: string }>(
  'skills/fetchSkillById',
  async (id, { rejectWithValue }) => {
    try {
      const skill = await mockGetSkillById(id);
      return skill;
    } catch {
      return rejectWithValue('Ошибка при загрузке навыка');
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
      .addCase(loadSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newSkills = action.payload.skills.filter(
          (s) => !state.skills.find((existing) => existing.id === s.id)
        );
        state.skills = [...state.skills, ...newSkills];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(loadSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkillById.fulfilled,
        (state, action: PayloadAction<IUserPublic | null>) => {
          state.loading = false;
          if (action.payload) {
            const exists = state.skills.find(
              (s) => s.id === action.payload!.id
            );
            if (!exists) {
              state.skills.push(action.payload);
            }
          }
        }
      )
      .addCase(fetchSkillById.rejected, (state, action) => {
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
export const getLoading = (state: RootState) => state.skills.loading;

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
        if (searchTarget === 'Могу научить') return can;
        if (searchTarget === 'Хочу научиться') return want;
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

export const getSimilarSkills = (userId: string) =>
  createSelector(getSkills, (skills) => {
    const user = skills.find((skill) => skill.id === userId);
    if (!user?.can?.subcategory) return [];

    return skills.filter(
      (skill) =>
        skill.can?.subcategory === user.can.subcategory && skill.id !== user.id
    );
  });

export const getSearchResults = createSelector(
  [getSkills, getSearchQuery],
  (skills, searchQuery) => {
    if (!searchQuery) return skills;

    const lowerQuery = searchQuery.toLowerCase();
    return skills.filter((skill) =>
      skill.can?.title?.toLowerCase().includes(lowerQuery)
    );
  }
);
