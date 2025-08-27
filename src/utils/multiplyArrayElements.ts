export const multiplyArrayElements = (
  data: any[],
  multiplyCount = 5
): any[] => {
  const resultArray = [];
  const timestamp = Date.now();

  for (let i = 0; i <= multiplyCount; i += 1) {
    resultArray.push(
      ...data.map((item, index) => ({
        ...item,
        id: `${item?.id}-${index}-${i}-${timestamp}`
      }))
    );
  }

  return resultArray;
};