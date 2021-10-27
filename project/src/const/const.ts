import { OffersType } from '../types/types';

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  OFFER: '/offer',
  FAVORITE: '/favorite',
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
    case SortMode.POPULAR:
    default:
      return data.slice();
  }
};
