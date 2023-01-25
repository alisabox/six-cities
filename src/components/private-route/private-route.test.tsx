import { Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const/const';
import PrivateRoute from './private-route';
import { CustomRouter } from '../..';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <Route path="/login"><h1>Public Route</h1></Route>
          <Route path="/private" element={
            <PrivateRoute>
              <h1>Private Route</h1>
            </PrivateRoute>
          } />
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <CustomRouter history={history}>
          <Route path="/login"><h1>Public Route</h1></Route>
          <Route path="/private" element={
            <PrivateRoute>
              <h1>Private Route</h1>
            </PrivateRoute>
          } />
        </CustomRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
