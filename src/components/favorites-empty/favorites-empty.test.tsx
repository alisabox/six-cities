import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import FavoritesScreenEmpty from './favorites-empty';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { CustomRouter } from '../..';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com' },
  OFFERS: { favoriteOffers: [] },
});

describe('Component: FavoritesScreenEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <FavoritesScreenEmpty />
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
