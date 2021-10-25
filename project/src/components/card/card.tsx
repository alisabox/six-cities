import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, RoomTypes, MAX_RATING, Screen, BasicCardImageSize, FavoriteCardImageSize} from '../../const/const';
import {OffersType} from '../../types/types';

type CardProps = {
  offer: OffersType;
  onHover?: (id: number | undefined) => void;
  isMainScreen?: boolean;
  isFavoriteScreen?: boolean;
  isPropertyScreen?: boolean;
}

function Card({offer, onHover, isMainScreen, isFavoriteScreen, isPropertyScreen}:CardProps):JSX.Element {
  const {isPremium, previewImage, title, price, isFavorite, rating, type, id} = offer;

  const handleHover = (evt: MouseEvent<HTMLElement>) => {
    if (!isMainScreen) {
      return;
    }
    evt.preventDefault();
    if (onHover) {
      onHover(offer.id);
    }
  };

  const handleBlur = () => {
    if (onHover) {
      onHover(undefined);
    }
  };

  const screenClass = () => {
    if (isMainScreen) {
      return Screen.MAIN;
    } else if (isFavoriteScreen) {
      return Screen.FAVORITE;
    } else if (isPropertyScreen) {
      return Screen.PROPERTY;
    }
    return Screen.MAIN;
  };

  return (
    <article className={`${isMainScreen ? 'cities__place-card' : `${screenClass()}__card`} place-card`}
      onMouseOver={handleHover} onMouseOut={handleBlur}
    >
      {
        isPremium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ''
      }
      <div className={`${screenClass()}__image-wrapper place-card__image-wrapper`}>
        <Link to={{pathname: `${AppRoute.OFFER}/${id}`, state: offer}}>
          <img className="place-card__image" src={previewImage}
            width={isFavoriteScreen ? FavoriteCardImageSize.WIDTH : BasicCardImageSize.WIDTH}
            height={isFavoriteScreen ? FavoriteCardImageSize.HEIGHT : BasicCardImageSize.HEIGHT}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${isFavoriteScreen ? 'favorites__card-info' : ''} place-card__info`}>
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
