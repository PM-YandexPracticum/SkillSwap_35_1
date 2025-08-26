import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSearchQuery, setSearchQuery } from '../../app/services/slices/skillsSlice';

const SearchWatcher = () => {
  const searchQuery = useSelector(getSearchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const trimmedQuery = searchQuery?.trim();
    if (trimmedQuery && location.pathname !== '/search') {
      navigate('/search');
    }
  }, [searchQuery, navigate, location]);

  useEffect(() => {
    return () => {
      if (location.pathname === '/search') {
        dispatch(setSearchQuery(''));
      }
    };
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (!searchQuery?.trim() && location.pathname === '/search') {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  }, [searchQuery, navigate, location]);

  return null;
};

export default SearchWatcher;
