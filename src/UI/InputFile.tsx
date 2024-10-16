import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { checkLabelSize, getImageName } from '../utils';

const Wrapper = styled.div`
  & input {
    display: none;
  }
`;

type LabelProps = {
  $small?: boolean;
  $width?: string;
};
const Label = styled.label<LabelProps>`
  display: block;
  font-size: ${(props) => (props.$small ? '1.2rem' : '1.6rem')};
  color: var(--color-text-main);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  ${(props) => props.$width && `width: ${props.$width};`}
  background-color: var(--color-pink);
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease-in;
  word-wrap: break-word;

  &:hover {
    opacity: 1;
  }
`;

type Props = {
  value: File | null | string;
  changeValue: (v: File) => void;
  small?: boolean;
  width?: string;
};

export default function InputFile({ value, small, width, changeValue }: Props) {
  function onChange(e: ChangeEvent) {
    const file = (e.target as HTMLInputElement)?.files?.[0] || null;
    if (!file) return;

    changeValue(file);
  }
  return (
    <Wrapper>
      <Label $small={!!small} $width={width} title={value ? getImageName(value) : ''}>
        {value ? checkLabelSize(getImageName(value), !!small) : 'Выбрать файл'}
        <input type="file" onChange={onChange} accept=".jpeg, .jpg, .png" />
      </Label>
    </Wrapper>
  );
}
