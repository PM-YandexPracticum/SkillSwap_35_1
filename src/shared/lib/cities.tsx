const cities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Красноярск',
  'Архангельск',
  'Пермь',
  'Ярославль',
  'Абакан'
] as const;

export type TCity = (typeof cities)[number];

export default cities;
