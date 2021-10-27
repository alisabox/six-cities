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
}

export enum ActionType {
  GetCityAction = 'MAIN_GET_CITY',
  GetOffersAction = 'MAIN_GET_OFFERS',
}

export type GetCityAction = {
  type: ActionType.GetCityAction;
  payload: string;
}

export type GetOffersAction = {
  type: ActionType.GetOffersAction;
  payload: OffersType[];
}

export type Actions = GetCityAction | GetOffersAction;
