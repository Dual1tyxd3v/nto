import { Auth, SHOW, SORT } from './config';

export type ContextType = {
  auth: Auth;
  changeAuthStatus: (v: Auth) => void;
};

export type ObjectType = {
  id: number;
  name: string;
  dateStarted: number;
  dateEnded: number | null;
  img: string | null | File;
  price: number;
  profit: number;
  expenses: Expenses[];
  phone: string;
  owner: string;
  location: string;
};

export type NewObject = Omit<ObjectType, 'id'>;

export type LoginForm = {
  email: string;
  password: string;
};

export type Expenses = {
  name: string;
  amount: string;
  img: string | null | File;
};

export type StatType = {
  totalProfit: number;
  amount: number;
  completed: number;
  inProgress: number;
};

export type FilesToChange = {
  toDelete: string[];
  toUpload: FilesToUpload[];
  newExpenses: Expenses[];
};

type FilesToUpload = {
  name: string;
  file: File;
};

export type ControlsContextType = {
  changeShow: (v: SHOW) => void;
  changeSort: (v: SORT) => void;
  sort: string;
  show: string;
};
