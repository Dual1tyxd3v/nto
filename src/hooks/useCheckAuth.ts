import { useNavigate } from 'react-router-dom';
import { Auth, AppRoute } from '../config';
import { useAuthContext } from './useAuthContext';
import { useEffect } from 'react';

export const useCheckAuth = (authStatus: Auth, route: AppRoute, isEqual?: boolean) => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEqual ? auth === authStatus : auth !== authStatus) {
      navigate(route);
    }
  }, [auth, authStatus, route, navigate, isEqual]);
};
