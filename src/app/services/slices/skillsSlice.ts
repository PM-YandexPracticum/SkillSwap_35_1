import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { IUserPublic } from "src/entities/types/types";

export type TSkillsState = {
  skills: IUserPublic[];
};

const initialState: TSkillsState = {
  skills: [],
};

export const SkillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    }
  },
  selectors: {
    getSkills: (state) => state.skills
  }
});

export const getSkillById = createSelector(
  SkillSlice.selectors.getSkills,
  (_, id) => id,
  (skills: IUserPublic[], id: string) => skills.find((skill) => skill.id === id)
);