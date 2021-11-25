import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Card from './card';
import { AppRoute, AuthorizationStatus, RoomTypes } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

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
    render (
      <Provider store={store}>
        <Router history={history}>
          <Card offer={offer} listItemHoverHandler={jest.fn()} isMainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(offer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(RoomTypes[offer.type.toUpperCase()])).toBeInTheDocument();
  });

  it('should fire listItemHoverHandler on card hover and pass offer id', () => {
    const cardHover = jest.fn();

    render (
      <Provider store={store}>
        <Router history={history}>
          <Card offer={offer} listItemHoverHandler={cardHover} isMainScreen />
        </Router>
      </Provider>,
    );

    userEvent.hover(screen.getByRole('article'));
    expect(cardHover).toBeCalledTimes(1);
    expect(cardHover).toBeCalledWith(offer.id);
  });


  it('should fire listItemHoverHandler on card blur and pass undefined', () => {
    const cardHover = jest.fn();

    render (
      <Provider store={store}>
        <Router history={history}>
          <Card offer={offer} listItemHoverHandler={cardHover} isMainScreen />
        </Router>
      </Provider>,
    );

    userEvent.unhover(screen.getByRole('article'));
    expect(cardHover).toBeCalledTimes(1);
    expect(cardHover).toBeCalledWith(undefined);
  });

  it('should return listItemHoverHandler with undefined on card hover if NOT isMainScreen', () => {
    const cardHover = jest.fn();
    const handleHover = jest.fn();
    render (
      <Provider store={store}>
        <Router history={history}>
          <Card offer={offer} listItemHoverHandler={cardHover}/>
        </Router>
      </Provider>,
    );

    userEvent.unhover(screen.getByRole('article'));
    expect(handleHover).not.toBeCalled();
  });
});
