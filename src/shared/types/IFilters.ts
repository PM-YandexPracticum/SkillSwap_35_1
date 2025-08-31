export type TGender = 'Мужской' | 'Женский' | 'Не имеет значения';
export type TSearchTarget = 'Хочу научиться' | 'Могу научить' | 'Всё';

export interface IFilters {
    subcategories: string[];
    gender: TGender;
    cities: string[];
    searchTarget: TSearchTarget;
  };