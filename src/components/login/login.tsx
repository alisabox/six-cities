import { FormEvent, ChangeEvent, MouseEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, AuthorizationStatus, getRandomCity, validate } from '../../const/const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getCity, redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import Header from '../header/header';

export const INVALID_LOGIN_MESSAGE = 'Invalid email or password';

export const randomCity = getRandomCity();

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: 'user@mail.com',
    password: '1!Qwerty'
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isValidLogin = validate(form.email, form.password);
    if (!isValidLogin) {
      toast.info(INVALID_LOGIN_MESSAGE);
      return;
    }
    if (form.email && form.password) {
      dispatch(loginAction({
        login: form.email,
        password: form.password,
      }));
    }
  };

  const handleRandomCityClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(getCity(randomCity));
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={form.email}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  data-testid="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={form.password}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  data-testid="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/" onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
