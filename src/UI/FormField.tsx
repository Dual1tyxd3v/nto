import { ReactNode } from 'react';
import styled from 'styled-components';

const Field = styled.div`
  margin-bottom: 3rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 3rem;
`;

type FormFieldProps = {
  children: ReactNode;
  label: string;
};

export default function FormField({ children, label }: FormFieldProps) {
  return (
    <Field>
      <Label>
        {label}
        {children}
      </Label>
    </Field>
  );
}
