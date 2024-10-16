import styled from 'styled-components';
import { LuDelete } from 'react-icons/lu';

const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--color-error);
  cursor: pointer;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ButtonDelete(props: any) {
  return (
    <Button {...props} type="button" aria-label="Удалить строку" title="Удалить строку">
      <LuDelete size={22} />
    </Button>
  );
}
