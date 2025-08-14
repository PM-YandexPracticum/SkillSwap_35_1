export interface Skill {
  id: number;
  category: string;
  title: string;
  description: string;
  type: 'Учу' | 'Учусь';
  tagging: string[];
  authorId: string;
}
