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

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
  OFFERS: {favoriteOffers: [favoriteOffer]},
});

describe('Component: FavoritesScreenEmpty', () => {
  it('should render correctly', () => {
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
});
