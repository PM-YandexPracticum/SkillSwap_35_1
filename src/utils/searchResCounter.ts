import { useSelector } from '../app/services/store';
import { getHasMore } from '../app/services/slices/skillsSlice';

const hasMore = useSelector(getHasMore);

export const searchResCounter = (count: number): string =>
  hasMore ? `не менее ${count}` : count.toString();
