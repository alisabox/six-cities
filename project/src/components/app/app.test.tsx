import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, cities, adaptToClient } from '../../const/const';
import { makeFakeOffers } from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();
const offers = [adaptToClient(makeFakeOffers())];

const history = createMemoryHistory();
describe('Application Routing', () => {

  it('should render "Loading" screen when data is loading', () => {
    const store = mockStore({
      OFFERS: {isDataLoaded: false},
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.queryByText(/The page is loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).toBeNull();
    expect(screen.queryByText(/Sign out/i)).toBeNull();
  });

  it('should render "Main" screen when user navigate to "/"', () => {
    const store = mockStore({
      OFFERS: {selectedCity: '', offers: [], isDataLoaded: true},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push(AppRoute.ROOT);
    render(fakeApp);

    const listOfCities = screen.getAllByText((new RegExp(cities.join('|'), 'i')));
    expect(listOfCities.length).toBe(6);
    expect(listOfCities[0].textContent).toBe('Paris');
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const store = mockStore({
      OFFERS: {selectedCity: '', offers, isDataLoaded: true},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    expect(screen.getAllByText((_content, el) =>
      el?.textContent === 'Sign in',
    )[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(cities.join('|'), 'gi'))).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorite"', () => {
    const store = mockStore({
      OFFERS: {favoriteOffers: offers, selectedCity: '', offers: [], isDataLoaded: true},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push(AppRoute.FAVORITE);
    render(fakeApp);

    expect(screen.getByText(new RegExp(cities.join('|'), 'gi'))).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Screen404" when user navigate to non-existent route', () => {
    const store = mockStore({
      OFFERS: {offers: [], isDataLoaded: true},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });
    history.push('/non-existent-route');
    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
