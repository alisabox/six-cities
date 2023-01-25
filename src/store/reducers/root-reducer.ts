import { combineReducers } from 'redux';
import { userProcess } from './user/user-reducer';
import { offersData } from './offers/offers-reducer';
import { reviewsData } from './reviews/reviews-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { requireAuthorization } from '../action';
import { AuthorizationStatus } from '../../const/const';
import { redirect } from '../middleware/redirect';

export enum NameSpace {
  offers = 'OFFERS',
  reviews = 'REVIEWS',
  user = 'USER',
}

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess,
  [NameSpace.offers]: offersData,
  [NameSpace.reviews]: reviewsData,
});

export const store: any = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
