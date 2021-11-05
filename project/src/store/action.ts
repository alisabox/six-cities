import { ClearOfferByIDAction, ClearPostReviewStatus, GetCityAction, GetNearByOffers, GetOfferByIDAction, GetOffersAction, GetReviews, OffersType, PostReview, ReviewsType } from '../types/types';
import {ActionType, AuthorizationStatus} from '../const/const';

export const getCity = (city: string): GetCityAction => ({
  type: ActionType.GetCityAction,
  payload: city,
});

export const getOffers = (offers: OffersType[]): GetOffersAction => ({
  type: ActionType.GetOffersAction,
  payload: offers,
});

export const getOfferByID = (offer: OffersType): GetOfferByIDAction => ({
  type: ActionType.GetOfferByIDAction,
  payload: offer,
});

export const clearOfferByID = (): ClearOfferByIDAction => ({
  type: ActionType.ClearOfferByIDAction,
});

export const getNearByOffers = (offers: OffersType[]): GetNearByOffers => ({
  type: ActionType.GetNearByOffers,
  payload: offers,
});

export const getReviews = (reviews: ReviewsType[]): GetReviews => ({
  type: ActionType.GetReviews,
  payload: reviews,
});

export const postReviewAction = (reviews: ReviewsType[]): PostReview => ({
  type: ActionType.PostReview,
  payload: reviews,
});

export const clearPostReviewStatus = (): ClearPostReviewStatus => ({
  type: ActionType.ClearPostReviewStatus,
});

export const requireAuthorization = (authStatus: AuthorizationStatus, email?: string) => ({
  type: ActionType.RequireAuthorization,
  payload: {authStatus, email},
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
