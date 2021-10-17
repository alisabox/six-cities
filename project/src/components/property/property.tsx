import {Link, useLocation} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING, Screen} from '../../const/const';
import {OffersType, ReviewsType} from '../../types/types';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import Card from '../card/card';
import { useEffect } from 'react';

type PropertyScreenProps = {
  reviews: ReviewsType[];
  offers: OffersType[];
}

function PropertyScreen({reviews, offers}: PropertyScreenProps):JSX.Element {
  const {state} = useLocation() as {state: OffersType};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  const {images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, city, id} = state;
  const {avatarUrl, isPro, name} = host;
  const closeByOffers = offers.filter((offer) => offer.id !== id).slice(0, 3);
  const closeByPoints = closeByOffers.map((offer) => ({location: offer.location, id: offer.id}));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image) =>  (
                  <div key={image} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium
                  ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ''
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className={`property__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating / MAX_RATING * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {RoomTypes[type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms === 1 ? '1 Bedroom' : `${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {
                    isPro
                      ?
                      <span className="property__user-status">
                        Pro
                      </span>
                      : ''
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>

              <ReviewsList reviews={reviews}/>

            </div>
          </div>
          <section className="property__map map">
            <Map city={city} points={closeByPoints}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                closeByOffers.map((offer) => <Card key={offer.id} offer={offer} screen={Screen.Property}/>)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
