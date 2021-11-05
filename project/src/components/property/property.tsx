import {Link, useParams} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING} from '../../const/const';
import {State} from '../../types/types';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import Card from '../card/card';
import { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { fetchNearByOffersAction, fetchOfferByIDAction, fetchReviews } from '../../store/api-actions';
import { clearOfferByID } from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import UserNavigation from '../user-navigation/user-navigation';

type OfferParams = {
  id: string;
};

const mapStateToProps = ({offer, nearbyOffers, reviews}: State) => ({
  offer,
  nearbyOffers,
  reviews,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onPageLoad: (id) => fetchOfferByIDAction(id),
  getNearByOffers: (id) => fetchNearByOffersAction(id),
  getReviews: (id) => fetchReviews(id),
  onDismount: clearOfferByID,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyScreen({reviews, offer, onPageLoad, onDismount, nearbyOffers, getNearByOffers, getReviews}: PropsFromRedux):JSX.Element {
  const params = useParams<OfferParams>();
  const id = parseInt(params.id, 10);

  useEffect(() => {
    onPageLoad(id);
    getNearByOffers(id);
    getReviews(id);
    window.scrollTo(0, 0);
    return ()  => {onDismount();};
  }, [getNearByOffers, getReviews, id, onDismount, onPageLoad]);

  if (!offer) {
    return (
      <LoadingScreen />
    );
  }

  const {images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  const {avatarUrl, isPro, name} = host;

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
              <UserNavigation />
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
              {
                reviews
                  ? <ReviewsList reviews={reviews}/>
                  : ''
              }
            </div>
          </div>
          <section className="property__map map">
            {
              nearbyOffers
                ? <Map offers={nearbyOffers}/>
                :  ''
            }
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearbyOffers
                  ? nearbyOffers.map((nearbyOffer) => <Card key={nearbyOffer.id} offer={nearbyOffer} isPropertyScreen />)
                  : ''
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export {PropertyScreen};
export default connector(PropertyScreen);
