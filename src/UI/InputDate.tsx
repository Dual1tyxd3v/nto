import styled from 'styled-components';

export const InputDate = styled.input.attrs({ type: 'date' })`
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid var(--color-grey);
  opacity: 60%;
  flex-grow: 1;
  color: var(--color-main-text);
  transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
  outline: none;
  max-width: 18rem;

  &:focus {
    opacity: 100%;
    border-color: var(--color-pink) !important;
  }
`;
