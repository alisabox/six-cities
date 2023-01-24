import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import MainScreen from './main';
import { AppRoute, AuthorizationStatus, cities } from '../../const/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.ROOT);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  OFFERS: {selectedCity: 'Paris', offers: []},
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    const listOfCities = screen.getAllByText((new RegExp(cities.join('|'), 'i')));
    expect(listOfCities.length).toBe(7);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
});
