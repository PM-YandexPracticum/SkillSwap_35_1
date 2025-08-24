import { useSelector, useDispatch } from '../app/services/store';
import { getMockSkills } from '../app/services/slices/skillsSlice';

export const fetchMoreSkills = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(getMockSkills(skills.length));
    }
  };

  return { skills, hasMore, loading, fetchMoreData };
};