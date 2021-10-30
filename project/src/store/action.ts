import { ActionType, GetCityAction, GetOffersAction, OffersType } from '../types/types';
import {AuthorizationStatus} from '../const/const';

export const getCity = (city: string): GetCityAction => ({
  type: ActionType.GetCityAction,
  payload: city,
});

export const getOffers = (offers: OffersType[]): GetOffersAction => ({
  type: ActionType.GetOffersAction,
  payload: offers,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
