import type { IUserPublic } from '../../../entities/types/types';

export interface CardSectionProps {
  data: IUserPublic[];
  title: string;
  linkSeeAll?: string;
}
