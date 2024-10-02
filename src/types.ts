import { Auth } from './config';

export type ContextType = {
  auth: Auth;
  changeAuthStatus: (v: Auth) => void;
};
