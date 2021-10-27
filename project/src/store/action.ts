import { ActionType, GetCityAction, GetOffersAction, OffersType } from '../types/types';

export const getCity = (city: string): GetCityAction => ({
  type: ActionType.GetCityAction,
  payload: city,
});

export const getOffers = (offers: OffersType[]): GetOffersAction => ({
  type: ActionType.GetOffersAction,
  payload: offers,
});
