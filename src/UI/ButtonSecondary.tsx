import styled from 'styled-components';

type Props = {
  $isCentered?: boolean;
};
export const ButtonSecondary = styled.button<Props>`
  border-radius: 1000rem;
  border: 1px solid var(--color-pink);
  ${(props) => props.$isCentered && 'margin: 0 auto;'}
  background-color: var(--color-btn-bg);
  color: var(--color-text-main);
  padding: 1rem 3rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: var(--color-pink);
  }
`;
