// src/shared/lib/cities.tsx
const cities = [
    "Москва",
    "Санкт-Петербург",
    "Казань",
    "Красноярск",
    "Архангельск",
    "Пермь",
    "Ярославль",
    "Абакан"
] as const;

export type TCities = typeof cities[number];

export default cities;
