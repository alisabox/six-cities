import { combineReducers } from 'redux';
import { userProcess } from './user/user-reducer';
import { offersData } from './offers/offers-reducer';
import { reviewsData } from './reviews/reviews-reducer';

export enum NameSpace {
offers = 'OFFERS',
reviews = 'REVIEWS',
user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess,
  [NameSpace.offers]: offersData,
  [NameSpace.reviews]: reviewsData,
});

export type RootState = ReturnType<typeof rootReducer>;
