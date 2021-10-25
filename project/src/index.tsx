import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {reducer} from './store/reducer';

const Setting = {
  CARDS_NUMBER: 5,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsNumber = {Setting.CARDS_NUMBER}
        offers = {offers}
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
