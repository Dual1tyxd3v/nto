import styled from 'styled-components';
import { Select } from '../UI/Select';
import { AppRoute, SHOW, SORT } from '../config';
import { useControlsContext } from '../hooks/useControlsContext';
import { ChangeEvent } from 'react';
import { Button } from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-pink);
  gap: 4rem;
`;

const Field = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 1.6rem;
  color: var(--color-grey);
`;

const Label = styled.label`
  display: flex;
  gap: 0.5rem;
  color: var(--color-text-main);
`;

export default function Controls() {
  const navigate = useNavigate();

  const { sort, changeSort, show, changeShow } = useControlsContext();
  const sortValues = Object.values(SORT);
  const showValues = Object.values(SHOW);

  function onChangeSort(e: ChangeEvent) {
    const { value } = e.target as HTMLSelectElement;
    changeSort(value as SORT);
  }

  function onChangeShow(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;
    changeShow(value as SHOW);
  }
  return (
    <Wrapper>
      <Field>
        Сортировка по
        <Select value={sort} onChange={onChangeSort}>
          {sortValues.map((value) => {
            const key = `select_sort_${value}`;
            return (
              <option key={key} value={value}>
                {value}
              </option>
            );
          })}
        </Select>
      </Field>
      <Field>
        Показывать
        {showValues.map((value) => {
          const key = `radio_sort_${value}`;
          return (
            <Label key={key}>
              {value}
              <input type="radio" value={value} checked={show === value} onChange={onChangeShow} />
            </Label>
          );
        })}
      </Field>
      <Button $small onClick={() => navigate(AppRoute.CREATE)}>
        Добавить объект
      </Button>
    </Wrapper>
  );
}
