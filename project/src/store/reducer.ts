import { offers } from '../mocks/offers';
import { State, Actions, ActionType } from '../types/types';


export const initialState: State = {
  selectedCity: 'Paris',
  offers: offers,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GetCityAction:
      return {...state, selectedCity: action.payload};
    case ActionType.GetOffersAction:
      return {...state, offers: action.payload};
    default:
      return state;
  }
};
