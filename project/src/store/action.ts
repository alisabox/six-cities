import {createAction} from '@reduxjs/toolkit';
import { OffersType, ReviewsType } from '../types/types';
import {ActionType, AuthorizationStatus} from '../const/const';

export const getCity = createAction(
  ActionType.GetCityAction,
  (city: string) => ({
    payload: {
      city,
    },
  }),
);

export const getOffers = createAction(
  ActionType.GetOffersAction,
  (offers: OffersType[]) => ({
    payload: {
      offers,
    },
  }),
);

export const getOfferByID = createAction(
  ActionType.GetOfferByIDAction,
  (offer: OffersType) => ({
    payload: {
      offer,
    },
  }),
);

export const clearOfferByID = createAction(ActionType.ClearOfferByIDAction);

export const getNearByOffers = createAction(
  ActionType.GetNearByOffers,
  (offers: OffersType[]) => ({
    payload: {
      offers,
    },
  }),
);

export const getReviewsAction = createAction(
  ActionType.GetReviews,
  (reviews: ReviewsType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const postReviewAction = createAction(
  ActionType.PostReview,
  (reviews: ReviewsType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const clearPostReviewStatus = createAction(ActionType.ClearPostReviewStatus);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus, email?: string) => ({
    payload: {
      authStatus,
      email,
    },
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({
    payload: {
      url,
    },
  }),
);
