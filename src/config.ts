import { Expenses, NewObject } from './types';

export enum Auth {
  AUTH = 'auth',
  NO_AUTH = 'no-auth',
  UNKNOWN = 'unknown',
}

export enum AppRoute {
  MAIN = '/',
  LOGIN = '/login',
  OBJECT = '/object',
  CREATE = '/create',
}

export const MAX_CHARS_FOR_LABEL = 16;

export const initObject: NewObject = {
  name: '',
  dateStarted: new Date().getTime(),
  dateEnded: null,
  img: null,
  price: 0,
  profit: 0,
  expenses: [] as Expenses[],
  phone: '',
  owner: '',
  location: '',
};

export const initExpense = {
  name: '',
  amount: '',
  img: '',
};

export enum SORT {
  DATE_NEW = 'Сначала новые',
  DATE_OLD = 'Сначала старые',
  PRICE_CHEAP = 'Сначала дешевые',
  PRICE_EXPENSE = 'Сначала дорогие',
}

export enum SHOW {
  ALL = 'Все',
  COMPLETED = 'Завершенные',
  IN_PROGRESS = 'В работе',
}
