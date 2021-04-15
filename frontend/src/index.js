import React from 'react';
import ReactDOM from 'react-dom';
import {NotificationContainer} from 'react-notifications';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
  <>
    <App />
    <NotificationContainer/>
  </>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
