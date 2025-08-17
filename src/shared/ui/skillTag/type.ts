type SkillCategory =
  | 'language'
  | 'business'
  | 'creative'
  | 'education'
  | 'household'
  | 'health'
  | 'other';

export interface SkillTagProps {
  name: string;
  category: SkillCategory;
  isCountExtra?: boolean;
}
