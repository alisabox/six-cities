import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  CARDS_NUMBER: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsNumber = {Setting.CARDS_NUMBER}
    />
  </React.StrictMode>,
  document.getElementById('root'));
