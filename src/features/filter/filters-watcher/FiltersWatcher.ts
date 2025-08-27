import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../../app/providers/store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFilters, initialState, clearAllFilters } from '../../../entities/skill/model/skills-slice/skillsSlice';

const FilterWatcher = () => {
  const filters = useSelector(getFilters);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const areFiltersDefault = (filters: typeof initialState.filters) => {
    return (
      filters.gender === initialState.filters.gender &&
      filters.searchTarget === initialState.filters.searchTarget &&
      filters.subcategories.length === 0 &&
      filters.cities.length === 0
    );
  };

  
  useEffect(() => {
    const filtersChanged = !areFiltersDefault(filters);

    if (filtersChanged && location.pathname !== '/filter') {
      navigate('/filter');
    }
  }, [filters, navigate, location]);

  
  useEffect(() => {
    return () => {
      if (location.pathname === '/filter') {
        dispatch(clearAllFilters());
      }
    };
  }, [location.pathname, dispatch]);

  return null;
};

export default FilterWatcher;
