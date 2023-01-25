import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, RoomTypes, MAX_RATING, Screen, BasicCardImageSize, FavoriteCardImageSize } from '../../const/const';
import { getFavoriteOffersMemo } from '../../store/reducers/offers/offers-selectors';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { handleFavoriteClickAction } from '../../utils/utils';
import { OffersType } from '../../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

type CardProps = {
  offer: OffersType;
  listItemHoverHandler?: (id?: number) => void;
  isMainScreen?: boolean;
  isFavoriteScreen?: boolean;
  isPropertyScreen?: boolean;
}

function Card({ offer, listItemHoverHandler, isMainScreen, isFavoriteScreen, isPropertyScreen }: CardProps): JSX.Element {
  const { isPremium, previewImage, title, price, rating, type, id } = offer;
  const isFavorite = useAppSelector(getFavoriteOffersMemo(id));
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleHover = (evt: MouseEvent<HTMLElement>) => {
    if (!isMainScreen) {
      return;
    }
    evt.preventDefault();
    if (listItemHoverHandler) {
      listItemHoverHandler(offer.id);
    }
  };

  const handleBlur = () => {
    if (listItemHoverHandler) {
      listItemHoverHandler(undefined);
    }
  };

  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => dispatch(handleFavoriteClickAction(authorizationStatus, isFavorite, id));


  const getScreenClass = () => {
    switch (true) {
      case isMainScreen:
        return Screen.MAIN;
      case isFavoriteScreen:
        return Screen.FAVORITE;
      case isPropertyScreen:
        return Screen.PROPERTY;
      default:
        return Screen.MAIN;
    }
  };

  return (
    <article className={`${isMainScreen ? 'cities__place-card' : `${getScreenClass()}__card`} place-card`}
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
      <div className={`${getScreenClass()}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFER}/${id}`} state={offer.id}>
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
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) / MAX_RATING * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`} state={offer.id}>{title}</Link>
        </h2>
        <p className="place-card__type">{RoomTypes[type.toUpperCase()]}</p>
      </div>
    </article>
  );
}

export default memo(Card);
