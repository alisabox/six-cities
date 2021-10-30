import { State, Actions, ActionType } from '../types/types';
import {adaptToClient, AuthorizationStatus} from '../const/const';

export const initialState: State = {
  selectedCity: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GetCityAction:
      return {...state, selectedCity: action.payload};
    case ActionType.GetOffersAction:
      return {...state, offers: adaptToClient(action.payload)};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};
