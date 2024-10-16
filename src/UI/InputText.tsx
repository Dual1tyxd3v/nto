import styled from 'styled-components';

type InputTextProps = {
  $small?: boolean;
  $align?: string;
  $color?: string | null;
  $maxWidth?: string;
};
export const InputText = styled.input<InputTextProps>`
  background-color: transparent;
  border: 1px solid var(--color-grey);
  border-radius: ${(props) => (props.$small ? '10px' : '15px')};
  padding: ${(props) => (props.$small ? '.5rem 1rem' : '1.4rem 2rem')};
  color: ${(props) => props.$color || 'var(--color-main-text)'};
  outline: none;
  width: 100%;
  max-width: ${(props) => props.$maxWidth || '35rem'};
  opacity: 60%;
  transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
  font-size: ${(props) => (props.$small ? '1.6rem' : '2rem')};
  font-weight: 400;
  line-height: 2.4rem;
  ${(props) => props.$align && `text-align: ${props.$align};`}

  &:focus {
    opacity: 100%;
    border-color: var(--color-pink);
  }

  &:disabled {
    backdrop-filter: blur(20px);
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  }
`;
