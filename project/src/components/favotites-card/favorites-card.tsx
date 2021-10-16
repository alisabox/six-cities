import {Link, useHistory} from 'react-router-dom';
import {OffersType} from '../../types/types';
import {AppRoute, RoomTypes, MAX_RATING} from '../../const/const';

type FavoritesCardProps = {
  favoriteOffer: OffersType;
}

function FavoritesCard({favoriteOffer}: FavoritesCardProps):JSX.Element {
  const {isPremium, previewImage, title, price, isFavorite, rating, type, id} = favoriteOffer;
  const history = useHistory();

  const handleClick = () => {
    history.push(
      `${AppRoute.OFFER}/${id}`,
      {state: favoriteOffer} as {state: OffersType},
    );
  };

  return (
    <article className="favorites__card place-card" onClick={handleClick}>
      {
        isPremium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ''
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={'#'}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt={title} />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating / MAX_RATING * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={'#'}>{title}</Link>
        </h2>
        <p className="place-card__type">{RoomTypes[type.toUpperCase()]}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
