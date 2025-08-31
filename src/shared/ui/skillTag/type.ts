import type { TSkillCategory } from '../../lib/constants/skillCategories';

export interface SkillTagProps {
  name: string;
  category: TSkillCategory | 'other';
  isCountExtra?: boolean;
}
