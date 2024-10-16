import { useParams } from 'react-router-dom';
import ObjectForm from '../components/ObjectForm';
import { AppRoute, Auth } from '../config';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useEffect, useState } from 'react';
import { ObjectType } from '../types';
import { getObjectById } from '../api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
font-size: 2rem;
`;

export default function Object() {
  const { id } = useParams();
  const [data, setData] = useState<null | ObjectType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useCheckAuth(Auth.NO_AUTH, AppRoute.LOGIN, true);

  useEffect(() => {
    async function getObject() {
      if (!id || isNaN(+id)) {
        setError('Неправильный ID');
        return;
      }

      setLoading(true);
      const { data: respData, error: respError } = await getObjectById(id);
      setLoading(false);
      respError && setError(respError);
      respData && setData(respData);
    }
    getObject();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Error message={error} clear={() => setError('')} />}
      {!data && !error && (
        <Wrapper>
          <Message>{loading ? 'Загрузка данных...' : 'Объект не найден'}</Message>
        </Wrapper>
      )}
      {data && <ObjectForm data={data} />}
    </>
  );
}
