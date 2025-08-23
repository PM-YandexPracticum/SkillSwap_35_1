export interface IFilters {
    subcategories: string[];
    gender: 'Мужской' | 'Женский' | 'Не имеет значения';
    cities: string[];
    searchTarget: 'Хочу научиться' | 'Могу научить' | 'Всё';
  };