import { useSelector, useDispatch } from '../../app/providers/store/store';
import { loadSkills } from '@entities/skill/model/skills-slice/skillsSlice';

export const useFetchMoreSkills = () => {
  const { skills, hasMore, loading } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(loadSkills(skills.length));
    }
  };

  return { skills, hasMore, loading, fetchMoreData };
};
