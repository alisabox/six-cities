import { OffersType, ReviewsType } from '../types/types';

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  OFFER: '/offer',
  FAVORITE: '/favorites',
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

const getRandomIndex = (min: number, max: number): number => {
  if (min < 0 || max < 0) {
    return 0;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  return Math.round(Math.random() * (max - min) + min);
};

export const getRandomCity = (): string => {
  const index = getRandomIndex(0, cities.length - 1);
  return cities[index];
};

export const getRandomRoomType = (): string => {
  const keys = Object.keys(RoomTypes);
  const index = getRandomIndex(0, keys.length - 1);
  return keys[index];
};

export const Markers = {
  DEFAULT: './img/pin.svg',
  CURRENT: './img/pin-active.svg',
};

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
  FAVORITE:  '/favorite',
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
  GetCityAction = 'MAIN/GET_CITY',
  GetOffersAction = 'MAIN/GET_OFFERS',
  GetOfferByIDAction = 'OFFERS/GET_OFFER',
  ClearOfferByIDAction = 'OFFERS/CLEAR_OFFER',
  GetNearByOffers = 'OFFERS/GET_NEARBY',
  GetReviews = 'OFFERS/GET_REVIEWS',
  PostReview = 'OFFERS/POST_REVIEW',
  PostError = 'OFFERS/POST_REVIEW_ERROR',
  ClearPostReviewStatus = 'OFFERS/CLEAR_POST_REVIEW_STATUS',
  ClearPostReviewError = 'OFFERS/CLEAR_POST_REVIEW_ERROR',
  GetFavoriteOffers = 'FAVORITE/GET_FAVORITE_OFFERS',
  ClearFavoriteOffers = 'FAVORITE/CLEAR_FAVORITE_OFFERS',
  AddToFavoriteOffers = 'FAVORITE/ADD_TO_FAVORITE',
  RemoveFromFavoriteOffers = 'FAVORITE/REMOVE_FROM_FAVORITE',
  RequireAuthorization = 'USER/REQUIRE_AUTHORIZATION',
  RequireLogout = 'USER/REQUIRE_LOGOUT',
  RedirectToRoute = 'USER/REDIRECT',
}

export const TypeOfFavoriteAction = {
  ADDITION_TO_FAVOTITE: 1,
  REMOVAL_FROM_FAVOTITE:  0,
};

const LoginRegexp = {
  EMAIL: /[^@\s]+@[^@\s]+\.[^@\s]+$/,
  PASSWORD: /^(?=.*\d)(?=.*[a-zA-Z])/,
};

export const validate = (login?: string, password?: string): boolean => {
  const validLoogin = login && LoginRegexp.EMAIL.test(login);
  const validPassword = password && LoginRegexp.PASSWORD.test(password);
  if (validLoogin && validPassword) {
    return true;
  }
  return false;
};

export const FailMessages = {
  POST: 'Unable to send the message. Check your internet connection',
  ADD_TO_FAVORITES: 'Unable to add to favorites. Check your internet connection',
  REMOVE_FROM_FAVORITES: 'Unable to remove from favorites. Check your internet connection',
};
