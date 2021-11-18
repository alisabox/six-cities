import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import FavoritesScreen from './favorites';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const favoriteOffer = makeFakeOffers();


describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
      OFFERS: {favoriteOffers: [favoriteOffer]},
    });

    const {getByText} = render (
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>,
    );

    expect(getByText(favoriteOffer.city.name)).toBeInTheDocument();
    expect(getByText(/Sign out/i)).toBeInTheDocument();
    expect(getByText(/test@test.com/i)).toBeInTheDocument();
  });
  it('should render FavoritesScreenEmpty when there are no favorite offers', () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
      OFFERS: {favoriteOffers: []},
    });

    const {getByText} = render (
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>,
    );

    expect(getByText('Favorites (empty)')).toBeInTheDocument();
    expect(getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(getByText(/Sign out/i)).toBeInTheDocument();
    expect(getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
