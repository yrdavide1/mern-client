import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Login from './components/login/Login';

// type AppProps = {
//   message: string;
// };

const App = (): JSX.Element => {
  return (
    <Login />
  );
};

export default App;
