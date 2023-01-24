import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import MainScreenEmpty from './main-empty';
import { AppRoute, AuthorizationStatus } from '../../const/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.ROOT);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <Router history={history}>
          <MainScreenEmpty  selectedCity={'Paris'}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
});
