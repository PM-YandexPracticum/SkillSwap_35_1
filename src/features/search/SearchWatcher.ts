import { useEffect, useRef } from 'react';
import { useSelector } from '../../app/services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSearchQuery } from '../../app/services/slices/skillsSlice';

const SearchWatcher = () => {
  const searchQuery = useSelector(getSearchQuery);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  const isSearchPage = location.pathname.startsWith('/search');

  useEffect(() => {
    const queryTrimmed = searchQuery.trim();

    if (queryTrimmed !== '') {
      if (!previousPath.current && !isSearchPage) {
        previousPath.current = location.pathname + location.search;
      }
      if (!isSearchPage) {
        navigate('/search');
      }
    }

    if (queryTrimmed === '' && isSearchPage) {
      navigate(previousPath.current || '/');
      previousPath.current = null;
    }
  }, [searchQuery, navigate, isSearchPage, location.pathname, location.search]);

  return null;
};

export default SearchWatcher;
