import { useContext } from 'react';
import { AuthContext } from '../App';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Context error');

  return context;
};
