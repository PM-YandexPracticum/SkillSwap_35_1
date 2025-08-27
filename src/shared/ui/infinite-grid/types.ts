import type { IUserPublic } from "src/entities/user/model/types/types";

export interface InfiniteGridProps {
  title: string;
  data: IUserPublic[];
  fetchData: () => void;
  hasMore: boolean;
}
