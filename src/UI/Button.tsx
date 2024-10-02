import styled from 'styled-components';

export const Button = styled.button`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 2.8rem;
  background-color: transparent;
  color: var(--color-main-text);
  padding: 1.4rem 4rem;
  border: 1px solid var(--color-pink);
  position: relative;
  cursor: pointer;
  margin: 0 1.2rem;
  transition: background-color 0.2s ease-in;

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: 1.5rem;
    max-width: 1.5rem;
    height: 70%;
    top: 50%;
    border: 0.5rem solid transparent;
    background-color: var(--color-pink);
    background-clip: padding-box;
    transform: translateY(-50%);
    transition: right 0.2s ease-in, left 0.2s ease-in, border-color 0.2s ease-in;
  }

  &::after {
    /* border-left: 0.8rem solid transparent; */
    right: -1.1rem;
  }

  &::before {
    left: -1.1rem;
  }

  &:hover {
    background-color: var(--color-pink);

    &::after {
      right: -1.2rem;
      border-color: var(--color-bg);
    }

    &::before {
      border-color: var(--color-bg);
      left: -1.2rem;
    }
  }
`;
