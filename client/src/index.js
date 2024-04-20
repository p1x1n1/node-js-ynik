import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import AppContextProvider from './AppContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));//получаем элемент из 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider/>
    </BrowserRouter>
  </React.StrictMode>
);



