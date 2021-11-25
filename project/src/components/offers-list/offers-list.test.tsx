import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import OffersList from './offers-list';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const mockOffers = [makeFakeOffers()];
const mockSelectedCity = mockOffers[0].city.name;

const store = mockStore({
  OFFERS: {favoriteOffers: mockOffers},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: OffersList', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersList
            offers={mockOffers}
            selectedCity={mockSelectedCity}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Places/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffers.length === 1 ? '1 place' : `${mockOffers.length} places`} to stay in ${mockSelectedCity}`)).toBeInTheDocument();
    mockOffers.map((mockOffer) => expect(screen.getByText(mockOffer.title)).toBeInTheDocument());
  });
});
