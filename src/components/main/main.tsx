import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCity } from '../../store/action';
import { cities } from '../../const/const';
import OffersList from '../offers-list/offers-list';
import MainScreenEmpty from '../main-empty/main-empty';
import Header from '../header/header';
import { getOffersInSelectedCity, getSelectedCity } from '../../store/reducers/offers/offers-selectors';


function MainScreen():JSX.Element {
  const selectedCity = useSelector(getSelectedCity);

  const offersInSelectedCity = useSelector(getOffersInSelectedCity(selectedCity));

  const dispatch = useDispatch();

  const handleCityClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const input = evt.target as HTMLElement;
    if (input.textContent) {
      dispatch(getCity(input.textContent));
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header isWithUserNavigation />

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

export default MainScreen;
