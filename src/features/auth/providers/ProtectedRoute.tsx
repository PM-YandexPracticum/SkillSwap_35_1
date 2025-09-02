import React from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui/preloader';
import {
  checkUserAuth,
  getUserData,
  getUserLoading,
  getIsInit
} from '@entities/user/model/user-slice/userSlice';
import { useSelector, useDispatch } from '../../../app/providers/store/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getUserLoading);
  const location = useLocation();

  useEffect(() => {
    if (!isInit) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, isInit]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
