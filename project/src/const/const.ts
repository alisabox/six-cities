import { OffersType, ReviewsType } from '../types/types';

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  OFFER: '/offer',
  FAVORITE: '/favorite',
  NOT_FOUND: '/not-found',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

type RoomTypesType = {
  [key: string]: string;
}

export const RoomTypes:RoomTypesType = {
  APARTMENT: 'Apartment',
  ROOM: 'Private room',
  HOUSE: 'House',
  HOTEL: 'Hotel',
};

export const MAX_RATING = 5;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';


export const Screen = {
  MAIN: 'cities',
  FAVORITE: 'favorites',
  PROPERTY:'near-places',
};

export const BasicCardImageSize = {
  WIDTH: 260,
  HEIGHT: 200,
};

export const FavoriteCardImageSize = {
  WIDTH: 150,
  HEIGHT: 110,
};

export const SortMode = {
  POPULAR: 'Popular',
  PRICE_UP: 'Price: low to high',
  PRICE_DOWN: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const sortOffers = (data: OffersType[], filter: string | null): OffersType[] => {
  switch (filter) {
    case SortMode.PRICE_DOWN:
      return data.slice().sort((prev, next) => (next.price - prev.price));
    case SortMode.PRICE_UP:
      return data.slice().sort((prev, next) => (prev.price - next.price));
    case SortMode.TOP_RATED:
      return data.slice().sort((prev, next) => (next.rating - prev.rating));
    default:
      return data.slice();
  }
};

export const APIRoute = {
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments',
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;


export const adaptToClient = (data: OffersType): OffersType => {
  const adaptedItem = Object.assign(
    {},
    data,
    {
      isFavorite: data['is_favorite'],
      isPremium: data['is_premium'],
      maxAdults: data['max_adults'],
      previewImage: data['preview_image'],
      host: {
        avatarUrl: data.host['avatar_url'],
        id: data.host.id,
        isPro: data.host['is_pro'],
        name: data.host.name,
      },
    },
  );
  delete adaptedItem['is_favorite'];
  delete adaptedItem['is_premium'];
  delete adaptedItem['max_adults'];
  delete adaptedItem['preview_image'];
  delete adaptedItem.host['avatar_url'];
  delete adaptedItem.host['is_pro'];
  return adaptedItem;
};

export const adaptReviewsToClient = (data: ReviewsType): ReviewsType => {
  const adaptedItem = Object.assign(
    {},
    data,
    {
      user: {
        avatarUrl: data.user['avatar_url'],
        id: data.user.id,
        isPro: data.user['is_pro'],
        name: data.user.name,
      },
    },
  );
  delete adaptedItem.user['avatar_url'];
  delete adaptedItem.user['is_pro'];
  return adaptedItem;
};

export enum ActionType {
  GetCityAction = 'MAIN_GET_CITY',
  GetOffersAction = 'MAIN_GET_OFFERS',
  GetOfferByIDAction = 'OFFERS/GET_OFFER',
  ClearOfferByIDAction = 'OFFERS/CLEAR_OFFER',
  GetNearByOffers = 'OFFERS/GET_NEARBY',
  GetReviews = 'OFFERS/GET_REVIEWS',
  PostReview = 'OFFERS/POST_REVIEW',
  ClearPostReviewStatus = 'OFFERS/CLEAR_POST_REVIEW_STATUS',
  RequireAuthorization = 'USER/REQUIRE_AUTHORIZATION',
  RequireLogout = 'USER/REQUIRE_LOGOUT',
  RedirectToRoute = 'USER/REDIRECT',
}
