import { address, name, datatype, lorem, image, date, internet } from 'faker';
import { OffersType, ReviewsType } from '../types/types';
import { getRandomCity, getRandomRoomType } from '../const/const';

const { number } = datatype;
const { paragraph, word } = lorem;
const { imageUrl } = image;

export const makeFakeOffers = (): OffersType => ({
  bedrooms: number(),
  city: {
    location: {
      latitude: parseInt(address.latitude(), 10),
      longitude:  parseInt(address.longitude(), 10),
      zoom: number(),
    },
    name: getRandomCity(),
  },
  description: paragraph(),
  goods: new Array(number({'min': 1, 'max': 5})).fill(null).map(() => word()),
  host: {
    'avatar_url': imageUrl(),
    id: number(),
    'is_pro': datatype.boolean(),
    name: name.findName(),
  },
  id: number(),
  images: new Array(number({'min': 1, 'max': 5})).fill(null).map(() => imageUrl()),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: {
    latitude: parseInt(address.latitude(), 10),
    longitude:  parseInt(address.longitude(), 10),
    zoom: number(),
  },
  'max_adults': number(),
  'preview_image': imageUrl(),
  price: number(),
  rating: number(),
  title: word(),
  type: getRandomRoomType(),
});

export const makeFakeReviews = (): ReviewsType => ({
  comment: paragraph(),
  date: date.recent().toISOString(),
  id: number(),
  rating: number(),
  user: {
    'avatar_url': imageUrl(),
    id: number(),
    'is_pro': datatype.boolean(),
    name: name.findName(),
  },
});

export const makeFakeUserEmail = (): string => internet.email();
