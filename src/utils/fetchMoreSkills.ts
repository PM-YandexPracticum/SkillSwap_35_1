import { useSelector, useDispatch } from '../app/services/store';
import { loadSkills } from '../app/services/slices/skillsSlice';

export const fetchMoreSkills = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(loadSkills(skills.length));
    }
  };

  return { skills, hasMore, loading, fetchMoreData };
};