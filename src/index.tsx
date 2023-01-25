import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import browserHistory from './browser-history/browser-history';

import { fetchDataAction, checkAuthAction, fetchFavoriteOffers } from './store/api-actions';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/reducers/root-reducer';


store.dispatch(checkAuthAction());
store.dispatch(fetchDataAction());
store.dispatch(fetchFavoriteOffers());

export const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>
);
