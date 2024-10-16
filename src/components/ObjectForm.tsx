import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Expenses, ObjectType } from '../types';
import { AppRoute, initExpense, initObject } from '../config';
import styled from 'styled-components';
import { InputText } from '../UI/InputText';
import { InputDate } from '../UI/InputDate';
import { getDate, getImageSrc, getTotalExpense, isFormFulfilled } from '../utils';
import { Button } from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../UI/Divider';
import { ButtonSecondary } from '../UI/ButtonSecondary';
import ButtonDelete from '../UI/ButtonDelete';
import InputFile from '../UI/InputFile';
import Error from './Error';
import Loader from './Loader';
import { createObject, deleteObject, updateObject } from '../api';

const Form = styled.form`
  min-width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Wrapper = styled.div`
  max-width: 120rem;
  min-width: 67rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

type PreviewBlockProps = {
  $isFilled?: boolean;
};
const PreviewBlock = styled.div<PreviewBlockProps>`
  width: 35rem;
  height: 20rem;
  margin: 0 auto 2rem;
  background-color: ${(props) => (props.$isFilled ? 'transparent' : 'var(--color-grey)')};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const ExpenseField = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-pink);
  margin-bottom: 3rem;
  text-align: center;
`;

type LabelProps = {
  $color?: string;
};
const Label = styled.label<LabelProps>`
  font-size: 1.6rem;
  color: ${(props) => props.$color || 'var(--color-grey)'};
  flex-grow: 1;
`;

const Buttons = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
`;

const SmallImage = styled.img`
  width: 5rem;
  min-width: 5rem;
`;

type ObjectFormProps = {
  data?: ObjectType;
};

export default function ObjectForm({ data }: ObjectFormProps) {
  const [formData, setFormData] = useState(() => (data ? { ...data } : { ...initObject }));
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function onChangeHandler(e: ChangeEvent) {
    const { value, id } = e.target as HTMLInputElement | HTMLSelectElement;

    let newValue: string | number | boolean = value;

    if (id.startsWith('date')) {
      newValue = new Date(value).getTime();
    }
    if (id.startsWith('is')) {
      newValue = !!value;
    }
    setFormData({ ...formData, [id as keyof typeof formData]: newValue });
  }

  function onExpenseChangeHandler(e: ChangeEvent) {
    const element = e.target as HTMLInputElement;
    const { id, name } = element.dataset;
    if (!id || !name) return;

    const newExp = [...formData.expenses];
    newExp[+id][name as keyof Expenses] = element.value;

    setFormData({ ...formData, expenses: newExp });
  }

  function onExpenseImageHandler(f: File, i: number) {
    if (!f) return;

    const newExp = [...formData.expenses];
    newExp[i].img = f;

    setFormData({ ...formData, expenses: newExp });
  }

  function onPreviewImageChangeHandler(v: File) {
    setFormData({ ...formData, img: v });
  }

  function onAddExpense() {
    setFormData({ ...formData, expenses: [...formData.expenses, { ...initExpense }] });
  }

  function onDeleteExpense(index: number) {
    setFormData({ ...formData, expenses: formData.expenses.filter((_, i) => i !== index) });
  }

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!isFormFulfilled(formData)) {
      setError('Заполните все поля');
      return;
    }
    let response: null | { error: string } = null;

    setLoading(true);
    if (!data) {
      response = await createObject(formData);
    } else {
      response = await updateObject(formData, data);
    }
    setLoading(false);

    setError(response?.error || 'Запись успешно сохранена');
  }

  async function onDelete() {
    if (!data) return;
    if (!window.confirm('Вы действительно хотите удалить объект?')) return;

    setLoading(true);
    const { error } = await deleteObject(data);
    setLoading(true);
    if (!error) {
      navigate(AppRoute.MAIN);
    }
    setError(error);
  }

  useEffect(() => {
    setFormData({ ...formData, profit: formData.price - getTotalExpense(formData.expenses) });
  }, [formData.price, formData.expenses]);

  return (
    <Form onSubmit={onSubmitHandler}>
      {error && <Error message={error} clear={() => setError('')} />}
      {loading && <Loader />}
      <Wrapper>
        <Title>{data ? 'Редактировать объект' : 'Создать объект'}</Title>
        <Field>
          <Label htmlFor="name">Имя</Label>
          <InputText required $small $align="right" id="name" value={formData.name} onChange={onChangeHandler} />
        </Field>
        <Field>
          <Label htmlFor="dateStarted">Дата начала</Label>
          <InputDate required id="dateStarted" value={getDate(formData.dateStarted, true)} onChange={onChangeHandler} />
        </Field>
        <Field>
          <Label htmlFor="dateEnded">Дата сдачи</Label>
          <InputDate
            id="dateEnded"
            value={formData.dateEnded ? getDate(formData.dateEnded, true) : ''}
            onChange={onChangeHandler}
          />
        </Field>
        <Field>
          <Label>Изображение</Label>
          <InputFile changeValue={onPreviewImageChangeHandler} value={formData.img} />
        </Field>
        <PreviewBlock $isFilled={!!formData.img}>
          {formData.img ? (
            <PreviewImage src={getImageSrc(formData.img)} alt="Выберите изображение" />
          ) : (
            <Label $color="var(--color-bg)">Выберите изображение</Label>
          )}
        </PreviewBlock>
        <Field>
          <Label htmlFor="price">Цена</Label>
          <InputText
            required
            $small
            type="number"
            $align="right"
            id="price"
            min={0}
            value={formData.price}
            onChange={onChangeHandler}
          />
        </Field>
        <Field>
          <Label>Профит</Label>
          <InputText
            $small
            $align="right"
            $color={formData.profit < 0 ? 'var(--color-error)' : 'var(--color-success)'}
            disabled
            value={formData.profit}
          />
        </Field>
        <Divider />
        <Field>
          <Label>Расходы</Label>
        </Field>
        {!!formData.expenses.length &&
          formData.expenses.map((_, i) => {
            const key = `${i}_expense`;
            return (
              <ExpenseField key={key}>
                <InputText
                  $small
                  $align="right"
                  data-id={i}
                  data-name="name"
                  placeholder="Наименование"
                  required
                  value={formData.expenses[i].name}
                  onChange={onExpenseChangeHandler}
                  $maxWidth="28rem"
                />
                <InputText
                  $small
                  $align="right"
                  $color="var(--color-error)"
                  data-id={i}
                  data-name="amount"
                  placeholder="Цена"
                  type="number"
                  min={0}
                  required
                  value={formData.expenses[i].amount}
                  onChange={onExpenseChangeHandler}
                  $maxWidth="28rem"
                />
                <InputFile
                  small
                  value={formData.expenses[i].img}
                  changeValue={(v: File) => onExpenseImageHandler(v, i)}
                  width="8.4rem"
                />
                {<SmallImage src={getImageSrc(formData.expenses[i].img)} />}
                <ButtonDelete onClick={() => onDeleteExpense(i)} />
              </ExpenseField>
            );
          })}
        <Field>
          <ButtonSecondary $isCentered onClick={onAddExpense}>
            Добавить строку
          </ButtonSecondary>
        </Field>
        <Divider />
        <Field>
          <Label htmlFor="owner">Имя заказчика</Label>
          <InputText id="owner" required value={formData.owner} onChange={onChangeHandler} $small $align="right" />
        </Field>
        <Field>
          <Label htmlFor="phone">Номер заказчика</Label>
          <InputText id="phone" required $small $align="right" value={formData.phone} onChange={onChangeHandler} />
        </Field>
        <Field>
          <Label htmlFor="location">Где находится</Label>
          <InputText
            id="location"
            required
            $small
            $align="right"
            value={formData.location}
            onChange={onChangeHandler}
          />
        </Field>
        <Buttons>
          <Button disabled={!isFormFulfilled(formData)} $small type="submit">
            Сохранить
          </Button>
          <Button $small onClick={() => navigate(AppRoute.MAIN)} type="button">
            На главную
          </Button>
          {data && (
            <Button $small type="button" onClick={onDelete}>
              Удалить
            </Button>
          )}
        </Buttons>
      </Wrapper>
    </Form>
  );
}
