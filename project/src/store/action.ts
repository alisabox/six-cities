import { GetCityAction, GetOffersAction, OffersType } from '../types/types';
import {ActionType, AuthorizationStatus} from '../const/const';

export const getCity = (city: string): GetCityAction => ({
  type: ActionType.GetCityAction,
  payload: city,
});

export const getOffers = (offers: OffersType[]): GetOffersAction => ({
  type: ActionType.GetOffersAction,
  payload: offers,
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
