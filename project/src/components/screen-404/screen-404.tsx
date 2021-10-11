import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';

function Screen404():JSX.Element {
  return (
    <div className="page page--favorites-empty">

      <main className="page__main page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 style={{textAlign: 'center'}}>404 Page Not Found</h1>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Screen404;
