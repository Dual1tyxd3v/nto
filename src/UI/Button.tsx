import styled from 'styled-components';

type ButtonProps = {
  $small?: boolean;
  $isCentered?: boolean;
  $borderColor?: string;
};
export const Button = styled.button<ButtonProps>`
  font-size: ${(props) => (props.$small ? '1.8rem' : '2.2rem')};
  font-weight: 700;
  line-height: 2.8rem;
  display: block;
  background-color: transparent;
  color: var(--color-main-text);
  padding: ${(props) => (props.$small ? '1rem 2rem' : '1.4rem 4rem')};
  border: 1px solid var(--color-pink);
  position: relative;
  cursor: pointer;
  margin: 0 ${(props) => (props.$isCentered ? 'auto' : '1.2rem')};
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
    right: -1.1rem;
  }

  &::before {
    left: -1.1rem;
  }

  &:hover {
    background-color: var(--color-pink);

    &::after {
      right: -1.2rem;
      border-color: ${(props) => props.$borderColor || 'var(--color-bg);'};
    }

    &::before {
      border-color: ${(props) => props.$borderColor || 'var(--color-bg);'};
      left: -1.2rem;
    }
  }

  &:disabled {
    border-color: var(--color-error);
    opacity: 0.5;
    cursor: not-allowed;

    &::after,
    &::before {
      border: 0.5rem solid transparent;
      background-color: var(--color-error);
    }
    &::after {
      right: -1.1rem;
    }

    &::before {
      left: -1.1rem;
    }
    &:hover {
      background-color: transparent;

      &::after,
      &::before {
        border: 0.5rem solid transparent;
        background-color: var(--color-error);
      }
    }
  }
`;
