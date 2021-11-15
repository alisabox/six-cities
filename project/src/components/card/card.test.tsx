import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Card from './card';
import { AppRoute, AuthorizationStatus, RoomTypes } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const offer = makeFakeOffers();

const store = mockStore({
  OFFERS: {favoriteOffers: [offer]},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: Card', () => {
  it('should render correctly', () => {
    const {getByText} = render (
      <Provider store={store}>
        <Router history={history}>
          <Card offer={offer} onHover={jest.fn()} isMainScreen />
        </Router>
      </Provider>,
    );

    expect(getByText(new RegExp(offer.price.toString(), 'i'))).toBeInTheDocument();
    expect(getByText(offer.title)).toBeInTheDocument();
    expect(getByText('/ night')).toBeInTheDocument();
    expect(getByText('In bookmarks')).toBeInTheDocument();
    expect(getByText('Rating')).toBeInTheDocument();
    expect(getByText(RoomTypes[offer.type.toUpperCase()])).toBeInTheDocument();
  });
});
