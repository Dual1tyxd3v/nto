import styled from 'styled-components';

export const InputText = styled.input`
  background-color: transparent;
  border: 1px solid var(--color-grey);
  border-radius: 15px;
  padding: 1.4rem 2rem;
  color: var(--color-main-text);
  outline: none;
  width: 100%;
  max-width: 35rem;
  opacity: 60%;
  transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.4rem;

  &:focus {
    opacity: 100%;
    border-color: var(--color-pink);
  }
`;
