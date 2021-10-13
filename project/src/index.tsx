import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';

const Setting = {
  CARDS_NUMBER: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsNumber = {Setting.CARDS_NUMBER}
      offers = {offers}
      reviews = {reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
