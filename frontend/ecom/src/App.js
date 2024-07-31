import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './route/AppRoute';

const App = () => (
  <>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </>
);

export default App;

