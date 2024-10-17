import { AppRoute, Auth, SHOW, SORT } from '../config';
import Header from '../components/Header';
import { filterObjects, getStat, sortObjects } from '../utils';
import { Wrapper } from '../UI/Wrapper';
import { createContext, useCallback, useEffect, useState } from 'react';
import { ControlsContextType, ObjectType } from '../types';
import Controls from '../components/Controls';
import Card from '../components/Card';
import styled from 'styled-components';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { getObjects } from '../api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Details from '../components/Details';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
  padding: 2rem 0;
`;

export const ControlsContext = createContext<null | ControlsContextType>(null);

export default function Main() {
  const [sort, setSort] = useState(SORT.DATE_NEW);
  const [show, setShow] = useState(SHOW.ALL);
  const [data, setData] = useState<ObjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<null | ObjectType>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data, error } = await getObjects();
      setData(data);
      setError(error);
      setLoading(false);
    }

    getData();
  }, []);

  useCheckAuth(Auth.AUTH, AppRoute.LOGIN);

  function changeSort(v: SORT) {
    setSort(v);
  }
  function changeShow(v: SHOW) {
    setShow(v);
  }

  const showDetails = useCallback((data: ObjectType) => {
    setDetails(data);
  }, []);
  const filteredData = filterObjects(sortObjects(data, sort), show);

  function closeDetails() {
    setDetails(null);
  }

  return (
    <ControlsContext.Provider value={{ changeShow, changeSort, sort, show }}>
      <Wrapper $isColumn $isCentered={false}>
        {loading && <Loader />}
        {error && <Error message={error} clear={() => setError('')} />}
        {details && <Details data={details} closeWindow={closeDetails} />}
        <Header data={getStat(data)} />
        <Controls />
        <Content>
          {filteredData.map((object) => {
            const key = `obj_${object.id}`;
            return <Card key={key} data={object} showDetails={showDetails} />;
          })}
        </Content>
      </Wrapper>
    </ControlsContext.Provider>
  );
}
