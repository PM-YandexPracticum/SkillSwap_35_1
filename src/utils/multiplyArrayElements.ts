export const multiplyArrayElements = (
  data: any[],
  multiplyCount = 5
): any[] => {
  const resultArray = [];

  for (let i = 0; i <= multiplyCount; i += 1) {
    resultArray.push(
      ...data.map((item, index) => {
        const idBase = item?.id ?? index;
        const newId = `${idBase}-${i}-${index}`;
        return { ...item, id: newId };
      })
    );
  }

  return resultArray;
};
