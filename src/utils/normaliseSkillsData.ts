import type { IUserPublic } from "src/entities/user/model/types/types";

export const normaliseSkillsData = (data: any[]): IUserPublic[] =>
  data.map((item) => ({
    ...item,
    gender:
      item.gender === 'male' || item.gender === 'female' ? item.gender : 'male'
  }));