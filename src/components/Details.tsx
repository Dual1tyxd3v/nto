import styled from 'styled-components';
import { ObjectType } from '../types';
import { MouseEvent, useEffect } from 'react';
import { formatTotal, getDate } from '../utils';
import Expense from './Expense';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  padding: 2rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 2rem;
  overflow-y: auto;
  max-height: 95vh;
  font-size: 1.6rem;
`;

type TitleProps = {
  $isCompleted?: boolean;
};
const Title = styled.h3<TitleProps>`
  font-size: 2.2rem;
  color: var(--color-${(props) => (props.$isCompleted ? 'success' : 'wip')});
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  padding: 0.5rem;
  text-align: center;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 70rem;
  border-radius: 15px;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type DetailsProps = {
  data: ObjectType;
  closeWindow: () => void;
};

export default function Details({ data, closeWindow }: DetailsProps) {
  const { name, img, expenses, profit, price, owner, phone, location, dateStarted, dateEnded } = data;

  useEffect(() => {
    function closeDetails(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      closeWindow();
    }
    window.addEventListener('keydown', closeDetails);

    () => window.removeEventListener('keydown', closeDetails);
  }, []);

  function onClickHandler(e: MouseEvent) {
    if ((e.target as HTMLElement).dataset.name !== 'wrapper') return;
    closeWindow();
  }
  return (
    <Wrapper onClick={onClickHandler} data-name="wrapper">
      <Content>
        <Title $isCompleted={!!dateEnded}>{name}</Title>
        <Img src={img as string} />
        <Field>
          <p>Начало строительства - {getDate(dateStarted)}</p>
          <p>
            Дата сдачи -{' '}
            <span style={{ color: `var(--color-${dateEnded ? 'success' : 'wip'})` }}>
              {dateEnded ? getDate(dateEnded) : 'В работе'}
            </span>
          </p>
        </Field>
        <Field>
          <p>Цена - {formatTotal(price)}</p>
          <p>
            Выручка -{' '}
            <span style={{ color: `var(--color-${profit > 0 ? 'success' : 'error'})` }}>{formatTotal(profit)}</span>
          </p>
        </Field>
        <Field>
          <p>Владелец</p>
          <p>{owner}</p>
        </Field>
        <Field>
          <p>Телефон</p>
          <p>{phone}</p>
        </Field>
        <Field>
          <p>Где находится</p>
          <p>{location}</p>
        </Field>
        {expenses.length ? <Title>- Расходы -</Title> : null}
        {expenses.map((exp) => {
          const key = `${exp.name}_exp`;
          return <Expense key={key} expense={exp} />;
        })}
      </Content>
    </Wrapper>
  );
}
