import type { TSkillCategory } from '../../lib/skillCategories';

export interface SkillTagProps {
  name: string;
  category: TSkillCategory | 'other';
  isCountExtra?: boolean;
}
