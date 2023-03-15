import React, { useEffect } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('home');
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/home' 
          element={
            <ProtectedRoute redirectPath='/login'>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
