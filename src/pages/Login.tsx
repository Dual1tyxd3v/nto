import styled from 'styled-components';
import FormField from '../UI/FormField';
import { InputText } from '../UI/InputText';
import { Wrapper } from '../UI/Wrapper';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../UI/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppRoute, Auth } from '../config';
import { Navigate } from 'react-router-dom';

const Form = styled.form`
  width: 38rem;
`;

const _testData = {
  l: '123',
  p: '123',
};

export default function Login() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const { auth, changeAuthStatus } = useAuthContext();

  if (auth === Auth.AUTH) {
    return <Navigate to={AppRoute.MAIN} />;
  }

  function onChangeHandler(e: ChangeEvent) {
    const element = e.target as HTMLInputElement;
    const { value } = element;
    const { id } = element.dataset || '';
    setFormData({ ...formData, [id as keyof typeof formData]: value });
  }

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    if (formData.login === _testData.l && formData.password === _testData.p) {
      changeAuthStatus(Auth.AUTH);
    }
  }
  return (
    <Wrapper>
      <Form onSubmit={onSubmitHandler}>
        <FormField label="Логин">
          <InputText value={formData.login} onChange={onChangeHandler} data-id="login" />
        </FormField>
        <FormField label="Пароль">
          <InputText value={formData.password} onChange={onChangeHandler} data-id="password" />
        </FormField>
        <Button>Войти</Button>
      </Form>
    </Wrapper>
  );
}
