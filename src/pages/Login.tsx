import styled from 'styled-components';
import FormField from '../UI/FormField';
import { InputText } from '../UI/InputText';
import { Wrapper } from '../UI/Wrapper';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../UI/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppRoute, Auth } from '../config';
import { login } from '../api';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { useCheckAuth } from '../hooks/useCheckAuth';

const Form = styled.form`
  width: 38rem;
`;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { changeAuthStatus } = useAuthContext();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useCheckAuth(Auth.AUTH, AppRoute.MAIN, true);

  function onChangeHandler(e: ChangeEvent) {
    const element = e.target as HTMLInputElement;
    const { value } = element;
    const { id } = element.dataset || '';
    setFormData({ ...formData, [id as keyof typeof formData]: value });
  }

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('Необходимо заполнить все поля');
      return;
    }

    setIsLoading(true);
    const { isSuccess, error } = await login(formData);
    setIsLoading(false);
    isSuccess && changeAuthStatus(Auth.AUTH);
    error && setMessage(error);
    // ошибки
    // loader
  }
  return (
    <Wrapper>
      {message && <Error message={message} clear={() => setMessage('')} />}
      {isLoading && <Loader />}
      <Form onSubmit={onSubmitHandler}>
        <FormField label="Логин">
          <InputText value={formData.email} onChange={onChangeHandler} data-id="email" />
        </FormField>
        <FormField label="Пароль">
          <InputText
            type="password"
            value={formData.password}
            onChange={onChangeHandler}
            data-id="password"
            autoComplete="true"
          />
        </FormField>
        <Button disabled={!formData.email || !formData.password }>Войти</Button>
      </Form>
    </Wrapper>
  );
}
