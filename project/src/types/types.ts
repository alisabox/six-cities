import { ActionType, AuthorizationStatus } from '../const/const';
import { getCity, getOffers, requireAuthorization, requireLogout, redirectToRoute } from '../store/action';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';

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
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type OffersType = {
  bedrooms: number;
  city: CityType;
  description: string;
  goods: string[];
  host: UserType;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  maxAdults: number,
  previewImage: string;
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

export type State = {
  selectedCity: string;
  offers: OffersType[];
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean;
  userEmail?: string;
}

export type GetCityAction = {
  type: ActionType.GetCityAction;
  payload: string;
}

export type GetOffersAction = {
  type: ActionType.GetOffersAction;
  payload: OffersType[];
}

export type Actions =
  | ReturnType<typeof getCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export type AuthData = {
  login: string;
  password: string;
};
