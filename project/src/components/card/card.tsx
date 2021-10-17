import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING, Screen, BasicCardImageSize, FavoriteCardImageSize} from '../../const/const';
import {OffersType} from '../../types/types';

type CardProps = {
  offer: OffersType;
  onHover?: (id: number) => void;
  screen?: Screen;
}

function Card({offer, onHover, screen}:CardProps):JSX.Element {
  const {isPremium, previewImage, title, price, isFavorite, rating, type, id} = offer;

  const handleHover = (evt: MouseEvent<HTMLElement>) => {
    if (screen !== Screen.Main) {
      return;
    }
    evt.preventDefault();
    onHover && onHover(offer.id);
  };

  return (
    <article className={`${screen === Screen.Main ? 'cities__place-card' : `${screen}__card`} place-card`}
      onMouseOver={handleHover}
    >
      {
        isPremium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ''
      }
      <div className={`${screen}__image-wrapper place-card__image-wrapper`}>
        <Link to={{pathname: `${AppRoute.OFFER}/${id}`, state: offer}}>
          <img className="place-card__image" src={previewImage}
            width={screen === Screen.Favorite ? FavoriteCardImageSize.WIDTH : BasicCardImageSize.WIDTH}
            height={screen === Screen.Favorite ? FavoriteCardImageSize.HEIGHT : BasicCardImageSize.HEIGHT}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${screen === Screen.Favorite ? 'favorites__card-info' : ''} place-card__info`}>
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
          <Link to={{pathname: `${AppRoute.OFFER}/${id}`, state: offer}}>{title}</Link>
        </h2>
        <p className="place-card__type">{RoomTypes[type.toUpperCase()]}</p>
      </div>
    </article>
  );
}

export default Card;
