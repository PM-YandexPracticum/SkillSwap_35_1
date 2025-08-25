import { useEffect, useRef } from 'react';
import { useSelector } from '../../app/services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSearchQuery } from '../../app/services/slices/skillsSlice';

const SearchWatcher = () => {
  const searchQuery = useSelector(getSearchQuery);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      if (!previousPath.current && location.pathname !== '/search') {
        previousPath.current = location.pathname + location.search;
      }
      if (location.pathname !== '/search') {
        navigate('/search');
      }
    }

    if ((!searchQuery || searchQuery.trim() === '') && location.pathname === '/search') {
      navigate(previousPath.current || '/');
      previousPath.current = null;
    }
  }, [searchQuery, navigate, location]);

  return null;
};

export default SearchWatcher;
