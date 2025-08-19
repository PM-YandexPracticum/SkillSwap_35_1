import type { TSkillCategory } from '@lib/skillCategories';

export type TSkill = {
  name: string;
  category: TSkillCategory;
}

export type SkillCardProps = {
  userName: string;
  userDetails: string;
  userSkillCategory: TSkillCategory;
  userSkillName: string;
  userPhotoUrl?: string;
  skillsToLearn: TSkill[];
  onLikeClick?: () => void;
  onDetailsClick?: () => void;
}
