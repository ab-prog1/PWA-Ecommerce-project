import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/custom.css';
import '../src/assets/css/fontawesome.css';
import '../src/assets/css/animate.min.css';
import '../src/assets/css/placeholder-loading.min.css';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
