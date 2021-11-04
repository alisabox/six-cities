import {MouseEvent} from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import { connect,ConnectedProps } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCity } from '../../store/action';
import {AppRoute, cities} from '../../const/const';
import {OffersType, State} from '../../types/types';
import OffersList from '../offers-list/offers-list';
import MainScreenEmpty from '../main-empty/main-empty';
import UserNavigation from '../user-navigation/user-navigation';


type MainScreenProps = {
  offers: OffersType[];
}

const mapStateToProps = ({selectedCity}: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onCityChange: getCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;


function MainScreen({offers, selectedCity, onCityChange}:ConnectedComponentProps):JSX.Element {
  const offersInSelectedCity = offers.filter((offer) =>  offer.city.name === selectedCity);
  const handleCityClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const input = evt.target as HTMLElement;
    if (input.textContent) {
      onCityChange(input.textContent);
    }
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <UserNavigation />
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                cities.map((menuCity) => (
                  <li key={menuCity} className="locations__item">
                    <a
                      className={`locations__item-link tabs__item ${menuCity === selectedCity ? 'tabs__item--active' : ''}`}
                      href="/"
                      onClick={handleCityClick}
                    >
                      <span>{menuCity}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        {
          offersInSelectedCity.length === 0
            ? <MainScreenEmpty selectedCity={selectedCity}/>
            : <OffersList selectedCity={selectedCity} offers={offersInSelectedCity} />
        }
      </main>
    </div>
  );
}

export {MainScreen};
export default connector(MainScreen);
