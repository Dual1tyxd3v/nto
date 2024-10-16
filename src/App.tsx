// import reactLogo from './assets/react.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { AppRoute, Auth } from './config';
import Login from './pages/Login';
import Object from './pages/Object';
import NotFound from './pages/NotFound';
import { createContext, useEffect, useState } from 'react';
import { ContextType } from './types';
import NewObject from './pages/NewObject';
import { getUser } from './api';
import Loader from './components/Loader';

export const AuthContext = createContext<null | ContextType>(null);

function App() {
  const [auth, setAuth] = useState(Auth.UNKNOWN);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = async () => {
      setIsLoading(true);
      const response = await getUser();
      setIsLoading(false);
      setAuth(response ? Auth.AUTH : Auth.NO_AUTH);
    };
    auth();
  }, []);

  if (isLoading) return <Loader />;

  function changeAuthStatus(value: Auth) {
    setAuth(value);
  }
  return (
    <AuthContext.Provider value={{ auth, changeAuthStatus }}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<Main />} />
          <Route path={AppRoute.LOGIN} element={<Login />} />
          <Route path={`${AppRoute.OBJECT}/:id`} element={<Object />} />
          <Route path={AppRoute.CREATE} element={<NewObject />} />
          <Route path="*" element={<NotFound />} />
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
