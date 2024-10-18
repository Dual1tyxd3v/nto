import styled from 'styled-components';
import { StatType } from '../types';
import { formatTotal } from '../utils';

const Head = styled.header`
  border-bottom: 1px solid var(--color-pink);
  padding-bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    padding: 0 1rem 2rem;
  }
`;

const P = styled.p`
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 3rem;
  color: var(--color-grey);

  & span {
    color: var(--color-text-main);
  }

  @media (max-width: 440px) {
    font-size: 2rem;
  }
`;

type HeaderProps = {
  data: StatType;
};

export default function Header({ data }: HeaderProps) {
  const { amount, totalProfit, completed, inProgress } = data;
  return (
    <Head>
      <P>
        Общий профит : <span>{formatTotal(totalProfit)}</span>
      </P>
      <P>
        Всего объектов : <span>{amount}</span>
      </P>
      <P>
        Выполненных : <span>{completed}</span>
      </P>
      <P>
        В работе : <span>{inProgress}</span>
      </P>
    </Head>
  );
}
