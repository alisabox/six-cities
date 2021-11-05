import { StateOld } from '../types/types';
import {AuthorizationStatus} from '../const/const';

export const initialState: StateOld = {
  selectedCity: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userEmail: '',
  offer: undefined,
  nearbyOffers: undefined,
  reviews: undefined,
  isPostSuccessfull: false,
};

// export const reducer = (state: StateOld = initialState, action: Actions): StateOld => {
//   switch (action.type) {
//     case ActionType.GetCityAction:
//       return {...state, selectedCity: action.payload};
//     case ActionType.GetOffersAction:
//       return {...state, offers: action.payload.map((item)  => adaptToClient(item))};
//     case ActionType.GetOfferByIDAction:
//       return {...state, offer: adaptToClient(action.payload)};
//     case ActionType.ClearOfferByIDAction:
//       return {...state, offer: undefined, nearbyOffers: undefined, reviews: undefined};
//     case ActionType.GetNearByOffers:
//       return {...state, nearbyOffers: action.payload.map((item)  => adaptToClient(item))};
//     case ActionType.GetReviews:
//       return {...state, reviews: action.payload.map((item)  => adaptReviewsToClient(item))};
//     case ActionType.PostReview:
//       return {...state, isPostSuccessfull: true, reviews: action.payload.map((item)  => adaptReviewsToClient(item))};
//     case ActionType.ClearPostReviewStatus:
//       return {...state, isPostSuccessfull: false};
//     case ActionType.RequireAuthorization:
//       return {...state, authorizationStatus: action.payload.authStatus, userEmail: action.payload.email, isDataLoaded: true};
//     case ActionType.RequireLogout:
//       return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
//     default:
//       return state;
//   }
// };
