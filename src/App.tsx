import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Routes, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

// type AppProps = {
//   message: string;
// };

const App = (): JSX.Element => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/home' 
          element={
            <ProtectedRoute redirectPath='/'>
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
