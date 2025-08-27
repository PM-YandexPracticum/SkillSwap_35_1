import type { TSkillCategory } from '@lib/constants/skillCategories';
import type { IDesiredSkill } from "src/entities/skill/model/types/types";

export type SkillCardProps = {
  userName: string;
  userCity: string;
  userDateofBirth: string;
  userSkillCategory: TSkillCategory;
  userSkillName: string;
  userPhotoUrl?: string;
  skillsToLearn: IDesiredSkill[];
  onLikeClick?: () => void;
  onDetailsClick?: () => void;
}
