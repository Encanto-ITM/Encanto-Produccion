import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Order } from './Pages/Order.jsx';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);