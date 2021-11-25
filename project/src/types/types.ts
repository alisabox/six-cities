import { Action } from 'redux';
import { AuthorizationStatus } from '../const/const';
import { ThunkAction}  from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/reducers/root-reducer';

export type LocationType = {
  latitude: number;
  longitude:  number;
  zoom: number;
}

export type CityType = {
  location: LocationType;
  name: string;
}

export type UserType = {
  avatarUrl?: string;
  id: number;
  isPro?: boolean;
  name: string;
  ['avatar_url']?: string,
  ['is_pro']?: boolean,
}

export type OffersType = {
  bedrooms: number;
  city: CityType;
  description: string;
  goods: string[];
  host: UserType;
  id: number;
  images: string[];
  isFavorite?: boolean;
  isPremium?: boolean;
  location: LocationType;
  maxAdults?: number,
  previewImage?: string;
  price: number,
  rating: number,
  title: string,
  type: string,
  ['is_favorite']?: boolean,
  ['is_premium']?: boolean,
  ['max_adults']?: number,
  ['preview_image']?: string,
};

export type ReviewsType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserType;
}

export type PostReviewType = {
  comment: string;
  rating: number;
}

export type FavoriteCitiesType = {
  [key: CityType['name']]: OffersType[];
}

export type State = RootState;

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  userEmail?: string
}

export type OffersState = {
  selectedCity: string;
  offers: OffersType[];
  isDataLoaded: boolean;
  offer?: OffersType;
  nearbyOffers?: OffersType[];
  favoriteOffers: OffersType[];
}

export type ReviewsState = {
  reviews?: ReviewsType[];
  postSuccess: boolean;
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AuthData = {
  login: string;
  password: string;
};

export type ReselectType<S> = (state: State) => S;
