import type { IUserPublic } from '../../../entities/types/types';

export interface InfiniteGridProps {
  title: string;
  data: IUserPublic[];
  fetchData: () => void;
  hasMore: boolean;
  onClick?: () => void;
}
