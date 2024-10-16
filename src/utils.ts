import { STORAGE_URL } from './api';
import { MAX_CHARS_FOR_LABEL, SHOW, SORT } from './config';
import { Expenses, FilesToChange, NewObject, ObjectType } from './types';

export const getStat = (data: ObjectType[]) => {
  return data.reduce(
    (a, b) => {
      a.totalProfit += b.profit;
      a.amount += 1;
      if (b.dateEnded) {
        a.completed += 1;
      } else {
        a.inProgress += 1;
      }
      return a;
    },
    {
      totalProfit: 0,
      amount: 0,
      completed: 0,
      inProgress: 0,
    }
  );
};

export const formatTotal = (total: number) => {
  const result: string[] = [];
  Math.abs(total)
    .toString()
    .split('')
    .reverse()
    .forEach((char, i) => {
      if (i && i % 3 === 0) {
        result.push(',');
      }
      result.push(char);
    });
  return `${total < 0 ? '-' : ''}${result.reverse().join('')}`;
};

export const filterObjects = (data: ObjectType[], filter: SHOW) => {
  if (filter === SHOW.ALL) return data;
  return data.filter((object) => (filter === SHOW.COMPLETED ? !!object.dateEnded : !object.dateEnded));
};

export const sortObjects = (data: ObjectType[], sort: SORT) => {
  const copy = JSON.parse(JSON.stringify(data)) as ObjectType[];
  switch (sort) {
    case SORT.DATE_OLD: {
      return copy.sort((a, b) => a.dateStarted - b.dateStarted);
    }
    case SORT.DATE_NEW: {
      return copy.sort((a, b) => b.dateStarted - a.dateStarted);
    }
    case SORT.PRICE_CHEAP: {
      return copy.sort((a, b) => a.price - b.price);
    }
    case SORT.PRICE_EXPENSE: {
      return copy.sort((a, b) => b.price - a.price);
    }
    default:
      return data;
  }
};

export const getDate = (time: number, reverse?: boolean) => {
  const date = new Date(time);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return reverse ? `${date.getFullYear()}-${month}-${day}` : `${day}-${month}-${date.getFullYear()}`;
};

export const getTotalExpense = (data: Expenses[]) => data.reduce((a, b) => a + +b.amount, 0);

export const getImageName = (data: File | string) => {
  if (data instanceof File) return data.name;

  const splittedSrc = data.split('/');

  return splittedSrc[splittedSrc.length - 1];
};

export const getImageSrc = (data: string | File | null) => {
  if (!data) return '';

  if (data instanceof File) {
    return URL.createObjectURL(data);
  }
  return data;
};

export const isFormFulfilled = (data: ObjectType | NewObject) => {
  const fieldsToCheck = ['name', 'dateStarted', 'img', 'price', 'owner', 'phone', 'location', 'expenses'];

  for (let i = 0; i < fieldsToCheck.length; i++) {
    if (fieldsToCheck[i] === 'expenses') {
      for (let j = 0; j < data.expenses.length; j++) {
        const { amount, name } = data.expenses[j];
        if (!amount.length || !name.length) return false;
      }
      continue;
    }
    if (!data[fieldsToCheck[i] as keyof typeof data]) return false;
  }

  return true;
};

export const getAllFiles = (data: Expenses[], img: File) => {
  const files = data.map((exp) => exp.img);
  files.push(img);
  const names = files.map((file, i) => (file ? `${new Date().getTime()}_${i}_${(file as File).name}` : null));

  return { names, files };
};

export const checkLabelSize = (text: string, isSmall: boolean) => {
  if (!isSmall) return text;

  return `${text.slice(0, MAX_CHARS_FOR_LABEL)}...`;
};

export const imagesToChange = (
  newImg: string | File | null,
  oldImg: string | File | null,
  newExpenses: Expenses[],
  oldExpenses: Expenses[]
) => {
  const files = [...newExpenses.map((exp) => exp.img)];
  const oldFiles = [...oldExpenses.map((exp) => exp.img)];
  const result: FilesToChange = {
    toDelete: [],
    toUpload: [],
    newExpenses: [],
  };

  if (newImg !== oldImg) {
    result.toDelete.push(oldImg as string);
    result.toUpload.push({
      name: `${new Date().getTime()}_img_${(newImg as File).name}`,
      file: newImg as File,
    });
  }

  oldFiles.forEach((image) => {
    if (!files.includes(image)) {
      result.toDelete.push(image as string);
    }
  });

  files.forEach((image, i) => {
    if (image instanceof File) {
      const name = `${new Date().getTime()}_${i}_${image.name}`;
      result.toUpload.push({
        name,
        file: image,
      });
      result.newExpenses.push({ ...newExpenses[i], img: `${STORAGE_URL}${name}` });
    }
    if (!result.newExpenses[i]) {
      result.newExpenses.push(newExpenses[i]);
    }
  });

  return result;
};
