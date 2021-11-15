import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import FavoritesScreenEmpty from './favorites-empty';
import { AppRoute, AuthorizationStatus } from '../../const/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
  OFFERS: {favoriteOffers: []},
});

describe('Component: FavoritesScreenEmpty', () => {
  it('should render correctly', () => {
    const {getByText} = render (
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreenEmpty />
        </Router>
      </Provider>,
    );
    const headerElement = getByText('Favorites (empty)');

    expect(headerElement).toBeInTheDocument();
  });
});
