import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import FavoritesScreen from './favorites';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';
import { CustomRouter } from '../..';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const favoriteOffer = makeFakeOffers();


describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com' },
      OFFERS: { favoriteOffers: [favoriteOffer] },
    });

    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <FavoritesScreen />
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText(favoriteOffer.city.name)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
  });
  it('should render FavoritesScreenEmpty when there are no favorite offers', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com' },
      OFFERS: { favoriteOffers: [] },
    });

    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <FavoritesScreen />
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
