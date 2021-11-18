import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import UserNavigation from './user-navigation';
import { AppRoute, AuthorizationStatus } from '../../const/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.ROOT);


describe('Component: UserNavigation', () => {
  it('should render correctly when user is not logged', () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render (
      <Provider store={store}>
        <Router history={history}>
          <UserNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).toBeNull();
  });

  it('should render correctly when user is logged', () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
    });

    render (
      <Provider store={store}>
        <Router history={history}>
          <UserNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).toBeNull();
  });
});
