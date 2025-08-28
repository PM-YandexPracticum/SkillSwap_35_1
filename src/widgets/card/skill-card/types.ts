import type { TSkillCategory } from '@lib/constants/skillCategories';
import type { IDesiredSkill } from '../../../entities/skill/model/types/types';

export type SkillCardProps = {
  userName: string;
  userCity: string;
  userDateofBirth: string;
  userSkillCategory: TSkillCategory;
  userSkillName: string;
  userPhotoUrl?: string;
  userAbout?: string;
  skillsToLearn: IDesiredSkill[];
  onLikeClick?: () => void;
  onDetailsClick?: () => void;
};
