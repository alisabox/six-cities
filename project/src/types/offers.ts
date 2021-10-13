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
