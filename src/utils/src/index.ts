/* eslint-disable import-x/prefer-default-export */
import type { IUserPublic } from '../../entities/types/types';

export const normaliseSkillsData = (data: any[]): IUserPublic[] =>
  data.map((item) => ({
    ...item,
    gender:
      item.gender === 'male' || item.gender === 'female' ? item.gender : 'male'
  }));

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
