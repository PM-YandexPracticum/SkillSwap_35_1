import type { IUserPublic } from "src/entities/user/model/types/types";

export interface CardSectionProps {
  data: IUserPublic[];
  title: string;
  linkSeeAll?: string;
}
