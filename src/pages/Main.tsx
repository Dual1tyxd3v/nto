import { AppRoute, Auth } from '../config';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Main() {
  const { auth } = useAuthContext();

  if (auth === Auth.UNKNOWN) {
    return <Navigate to={AppRoute.LOGIN} />;
  }
  return <p>main page</p>;
}
