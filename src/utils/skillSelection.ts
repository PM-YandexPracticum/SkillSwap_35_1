// Добавление категорий
export const updateCategories = (selectedCats: string[], prevValue: any[]) =>
  selectedCats.map((cat) => {
    const existing = prevValue?.find((i) => i.category === cat);
    return existing || { category: cat, subcategory: '' };
  });

// Добавление подкатегорий
export const updateSubcategories = (
  selectedSubs: string[],
  prevValue: any[],
  skillCategories: Record<string, string[]>
) => {
  const newWant = [...prevValue];

  selectedSubs.forEach((sub) => {
    const category = Object.keys(skillCategories).find((cat) =>
      skillCategories[cat].includes(sub)
    );
    if (!category) return;

    const idx = newWant.findIndex(
      (i) => i.category === category && !i.subcategory
    );

    if (idx !== -1) {
      newWant[idx].subcategory = sub;
    } else if (
      !newWant.some((i) => i.category === category && i.subcategory === sub)
    ) {
      newWant.push({ category, subcategory: sub });
    }
  });

  return newWant;
};


