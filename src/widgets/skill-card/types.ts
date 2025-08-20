import type { TSkillCategory } from '@lib/skillCategories';
import type { IDesiredSkill } from '../../entities/types/types';

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
