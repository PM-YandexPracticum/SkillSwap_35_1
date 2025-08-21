import type { IUserPublic } from '../../../entities/types/types';

export interface CardSectionProps {
  data: IUserPublic[];
  title: string;
  maxVisible?: number; // максимальное количество отображаемых пользователей
  linkSeeAll?: string; // ссылка на страницу "Смотреть все"
}
