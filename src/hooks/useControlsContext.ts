import { useContext } from 'react';
import { ControlsContext } from '../pages/Main';

export const useControlsContext = () => {
  const context = useContext(ControlsContext);
  if (!context) throw new Error('Controls context error');

  return context;
};
