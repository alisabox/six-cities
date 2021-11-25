import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ReviewForm from './review-form';
import { AppRoute, AuthorizationStatus, adaptToClient } from '../../const/const';
import { makeFakeOffers, makeFakeReviews } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockOffer = adaptToClient(makeFakeOffers());
const nearbyOffer = adaptToClient(makeFakeOffers());
const mockOffers = [mockOffer];
const mockReviews = [makeFakeReviews()];

history.push(`${AppRoute.OFFER}/${mockOffer.id}`);
const store = mockStore({
  OFFERS: {favoriteOffers: mockOffers, offer: mockOffer, nearbyOffers: [nearbyOffer]},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  REVIEWS: {reviews: mockReviews},
});

describe('Component: ReviewForm', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render correctly', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={`${AppRoute.OFFER}/:id`}>
              <ReviewForm />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/i)).toBeInTheDocument();
    expect(screen.getByText(/50 characters/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Submit/i)).toBeInstanceOf(Array);
  });
});
