import {ReviewsType} from '../types/types';

export const reviews:ReviewsType[] = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'img/avatar-max.jpg',
      'id': 4,
      'isPro': false,
      'name': 'Max',
    },
  }, {
    'comment': 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 2,
    'rating': 5,
    'user': {
      'avatarUrl': 'img/avatar-angelina.jpg',
      'id': 4,
      'isPro': true,
      'name': 'Angelina',
    },
  },
];
