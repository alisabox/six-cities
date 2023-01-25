import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import PropertyScreen from './property';
import { AppRoute, AuthorizationStatus, adaptToClient } from '../../const/const';
import { makeFakeOffers, makeFakeReviews } from '../../utils/mocks';
import { CustomRouter } from '../..';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockOffer = adaptToClient(makeFakeOffers());
const nearbyOffer = adaptToClient(makeFakeOffers());
const mockOffers = [mockOffer];
const mockReviews = [makeFakeReviews()];

history.push(`${AppRoute.OFFER}/${mockOffer.id}`);
const store = mockStore({
  OFFERS: { favoriteOffers: mockOffers, offer: mockOffer, nearbyOffers: [nearbyOffer] },
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  REVIEWS: { reviews: mockReviews },
});

describe('Component: PropertyScreen', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render correctly', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.OFFER}/:id`}>
              <PropertyScreen />
            </Route>
          </Routes>
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.rating)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockOffer.maxAdults} adults`)).toBeInTheDocument();
  });
});
