import { createClient } from '@supabase/supabase-js';
import { LoginForm, NewObject, ObjectType } from './types';
import { getAllFiles, imagesToChange } from './utils';

const URL = 'https://apusikwfhcpjtwtwpbnu.supabase.co';
export const STORAGE_URL = 'https://apusikwfhcpjtwtwpbnu.supabase.co/storage/v1/object/objectsImages/';
const KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdXNpa3dmaGNwanR3dHdwYm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDAxODcsImV4cCI6MjA0NDExNjE4N30._Qnwx5gcQ7ib3B8uE43OU7WraYrJKx0GSnwsWgHtYnw';

const supabase = createClient(URL, KEY);

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return false;

  const { error } = await supabase.auth.getUser();
  if (error) throw new Error('Cant get user');

  return true;
};

export const login = async ({ email, password }: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message, isSuccess: false };

  return { error: '', isSuccess: true };
};

export const getObjects = async () => {
  try {
    const { data, error } = await supabase.from('objects').select('*');

    return error ? { error: error.message, data: [] } : { error: '', data };
  } catch (e) {
    console.log(e);
    return { error: e instanceof Error ? e.message : 'Что то сломалось :(', data: [] };
  }
};

export const createObject = async (data: NewObject) => {
  try {
    const { img, expenses } = data;
    const images = getAllFiles(expenses, img as File);

    for (let i = 0; i < images.files.length; i++) {
      if (!images.files[i] || !images.names[i]) continue;

      const error = await uploadImage(images.files[i] as File, images.names[i] as string);
      if (error) {
        return { error: error.message, isSuccess: false };
      }
    }

    data.img = `${STORAGE_URL}${images.names[images.names.length - 1]}`;
    data.expenses.forEach((exp, i) => {
      if (images.names[i]) {
        exp.img = `${STORAGE_URL}${images.names[i]}`;
      }
    });

    const { error } = await supabase.from('objects').insert([data]).select();

    if (error) {
      return { error: error.message };
    }

    return { error: '' };
  } catch (e) {
    console.log(e);
    return { error: e instanceof Error ? e.message : 'Что то сломалось :(' };
  }
};

export const updateObject = async (newData: NewObject, oldData: ObjectType) => {
  try {
    const changedImages = imagesToChange(newData.img, oldData.img, newData.expenses, oldData.expenses);

    // удаление изображений
    if (changedImages.toDelete.length) {
      const { deleteError, data: imagesData } = await deleteImage(changedImages.toDelete);
      if (deleteError || !imagesData) {
        return { error: deleteError || 'Не удалось удалить изображения' };
      }
    }

    // загрузка новых изображений
    for (let i = 0; i < changedImages.toUpload.length; i++) {
      const { name, file } = changedImages.toUpload[i];
      const uploadError = await uploadImage(file, name);
      if (uploadError) {
        return { error: uploadError.message };
      }
    }

    // обновление объекта
    newData.img = newData.img !== oldData.img ? `${STORAGE_URL}${changedImages.toUpload[0].name}` : oldData.img;
    newData.expenses = changedImages.newExpenses;

    const { data, error } = await supabase.from('objects').update(newData).eq('id', oldData.id).select();

    if (error || !data) return { error: error.message || 'Не удалось обновить объект' };

    return { error: '' };
  } catch (e) {
    console.log(e);
    return { error: e instanceof Error ? e.message : 'Невозможно обновить объект' };
  }
};

const uploadImage = async (file: File, name: string) => {
  try {
    const { error } = await supabase.storage.from('objectsImages').upload(name, file);
    return error;
  } catch (e) {
    console.log(e);
  }
};

const deleteImage = async (src: string[]) => {
  try {
    const names = src.map((url) => {
      const splitted = url.split('/');

      return splitted[splitted.length - 1];
    });
    const { data, error } = await supabase.storage.from('objectsImages').remove(names);

    return { deleteError: error?.message || null, data };
  } catch (e) {
    console.log(e);
    return { deleteError: e instanceof Error ? e.message : 'Не удалось удалить изображение', data: null };
  }
};

export const getObjectById = async (id: string) => {
  try {
    const { data, error } = await supabase.from('objects').select('*').eq('id', id);

    if (error) {
      return { error: error.message, data: null };
    }

    return { error: '', data: data[0] };
  } catch (e) {
    console.log(e);
    return { error: e instanceof Error ? e.message : 'Что то сломалось :(', data: null };
  }
};

export const deleteObject = async (data: ObjectType) => {
  try {
    const { id, img, expenses } = data;
    const images = [img as string, ...expenses.map((exp) => exp.img as string)].filter((image) => image);

    const { deleteError, data: imagesData } = await deleteImage(images);

    if (deleteError || !imagesData) {
      return { error: deleteError || 'Не удалось удалить изображения' };
    }

    const { error } = await supabase.from('objects').delete().eq('id', id);

    return { error: error?.message || '' };
  } catch (e) {
    console.log(e);
    return { error: e instanceof Error ? e.message : 'Что то сломалось :(' };
  }
};
