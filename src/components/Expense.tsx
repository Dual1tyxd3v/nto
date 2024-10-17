import styled from 'styled-components';
import { Expenses } from '../types';
import { useState } from 'react';
import { formatTotal } from '../utils';

const Wrapper = styled.div`
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  padding: 0.5rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 10rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & span {
    color: var(--color-error);
  }
`;

const Img = styled.img`
  grid-column: 1/-1;
  width: 70%;
  max-width: 60rem;
  margin: 0 auto;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: var(--color-text-main);
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease-in;
  text-transform: lowercase;
  font-size: 1.6rem;

  &:hover {
    transform: scaleX(1.1);
  }
`;

type Props = {
  expense: Expenses;
};

export default function Expense({ expense }: Props) {
  const [isReportVisible, setIsReportVisible] = useState(false);
  const { img, name, amount } = expense;
  return (
    <Wrapper>
      <p>{name}</p>
      <p>
        <span>{formatTotal(+amount)}</span>
      </p>
      {img ? (
        <Button onClick={() => setIsReportVisible((prev) => !prev)}>{isReportVisible ? '-' : '+'} Показать</Button>
      ) : null}
      {isReportVisible && img && <Img src={img as string} />}
    </Wrapper>
  );
}
