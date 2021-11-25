import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen, { INVALID_LOGIN_MESSAGE, randomCity } from './login';
import { AuthorizationStatus, cities } from '../../const/const';
import * as Redux from 'react-redux';
import * as Const from '../../const/const';
import { AppRoute } from '../../const/const';
import { ToastContainer, toast } from 'react-toastify';
import * as ApiActions from '../../store/api-actions';
import * as Action from '../../store/action';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText((_content, el) =>
      el?.textContent === 'Sign in',
    )[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keks@gmail.com');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

    expect(screen.getByText(new RegExp(cities.join('|'), 'gi'))).toBeInTheDocument();
  });

  it('should dispatch loginAction when user submits the form with correct entries', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const validateSpy = jest.spyOn(Const, 'validate');
    validateSpy.mockReturnValue(true);

    const loginAction = jest.spyOn(ApiActions, 'loginAction');

    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email'), 'keks@gmail.com');
    userEvent.type(screen.getByTestId('password'), '123456');
    userEvent.click(screen.getByTestId('submit'));

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith('keks@gmail.com', '123456');
    expect(loginAction).toBeCalledTimes(1);
    expect(loginAction).toBeCalledWith({
      login: 'keks@gmail.com',
      password: '123456',
    });
  });

  it('should show toast message when user submits the form with incorrect entries', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    const toastSpy = jest.spyOn(toast, 'info');

    const validateSpy = jest.spyOn(Const, 'validate');
    validateSpy.mockReturnValue(false);

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <Router history={history}>
          <ToastContainer />
          <LoginScreen />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email'), 'a@a');
    userEvent.type(screen.getByTestId('password'), '1');
    userEvent.click(screen.getByTestId('submit'));

    expect(toastSpy).toBeCalledTimes(1);
    expect(toastSpy).toBeCalledWith(INVALID_LOGIN_MESSAGE);
  });

  it('should redirect to random city of randomCity click', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const getCity = jest.spyOn(Action, 'getCity');
    const redirectToRoute = jest.spyOn(Action, 'redirectToRoute');

    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(randomCity));

    expect(getCity).toBeCalledTimes(1);
    expect(getCity).toBeCalledWith(randomCity);
    expect(redirectToRoute).toBeCalledTimes(1);
    expect(redirectToRoute).toBeCalledWith(AppRoute.ROOT);
  });

  it('should not render "LoginScreen" if user is authorized', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByPlaceholderText(/Email/i)).toBeNull();
    expect(screen.queryByPlaceholderText(/Password/i)).toBeNull();
  });
});
