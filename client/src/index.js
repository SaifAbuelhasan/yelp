import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantContext';


ReactDOM.render(
  <RestaurantsContextProvider>
    <BrowserRouter><App /></BrowserRouter>
  </RestaurantsContextProvider>,
  document.getElementById('root')
);