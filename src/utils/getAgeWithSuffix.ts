export const getAgeWithSuffix = (birthDate: string): string => {
    const [day, month, year] = birthDate.split('.').map(Number);

    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return '';

    const now = new Date();
    let age =
      now.getFullYear() -
      d.getFullYear() -
      (now.getMonth() < d.getMonth() ||
      (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())
        ? 1
        : 0);

    const suffix =
      age % 100 > 10 && age % 100 < 15
        ? 'лет'
        : age % 10 === 1
          ? 'год'
          : age % 10 >= 2 && age % 10 <= 4
            ? 'года'
            : 'лет';

    return `${age} ${suffix}`;
  }