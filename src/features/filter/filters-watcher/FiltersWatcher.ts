import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../../app/providers/store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFilters, initialState, clearAllFilters } from '../../../entities/skill/model/skills-slice/skillsSlice';

const FilterWatcher = () => {
  const filters = useSelector(getFilters);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prevPath = useRef(location.pathname);

  const areFiltersDefault = JSON.stringify(filters) === JSON.stringify(initialState.filters);

  useEffect(() => {
  const filtersChanged = !areFiltersDefault;

  if (
    filtersChanged &&
    location.pathname !== '/filter' &&
    prevPath.current !== '/filter'
  ) {
    const timeout = setTimeout(() => {
      navigate('/filter', { replace: true });
    }, 50);

    return () => clearTimeout(timeout);
  }
}, [filters, navigate, location.pathname, areFiltersDefault]);

useEffect(() => {
  if (prevPath.current === '/filter' && location.pathname !== '/filter') {
    if (location.pathname !== '/search') {
      setTimeout(() => {
        dispatch(clearAllFilters());
      }, 0);
    }
  }
  prevPath.current = location.pathname;
}, [location.pathname, dispatch]);

  return null;
};

export default FilterWatcher;
