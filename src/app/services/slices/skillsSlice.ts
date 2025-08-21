/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserPublic } from 'src/entities/types/types';
//import mockSkills from '../../../../public/db/users.json';
import { multiplyArrayElements } from '../../../utils';

export type TSkillsState = {
  skills: IUserPublic[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
};

const initialState: TSkillsState = {
  skills: [],
  loading: false,
  error: null,
  hasMore: true
};

export const getMockSkills = createAsyncThunk(
  'skills/getMockCards',
  async (startIndex: number, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    }
  },
  selectors: {
    getSkills: (state) => state.skills
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

export const getSkillById = createSelector(
  SkillSlice.selectors.getSkills,
  (_, id) => id,
  (skills: IUserPublic[], id: string) => skills.find((skill) => skill.id === id)
);
