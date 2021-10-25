import { ActionType } from '../types/types';

export const getCity = (city: string) => ({
  type: ActionType.GetCityAction,
  payload: city,
} as const);
