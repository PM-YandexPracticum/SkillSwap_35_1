import type { TSkillCategory } from '@lib/constants/skillCategories';
import type { IDesiredSkill } from '../../../entities/skill/model/types/types';

export type SkillCardProps = {
  id: string;
  userName: string;
  userCity: string;
  userDateofBirth: string;
  userSkillCategory: TSkillCategory;
  userSkillName: string;
  userPhotoUrl?: string;
  userAbout?: string;
  skillsToLearn: IDesiredSkill[];
};
