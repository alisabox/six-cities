import {NameSpace} from '../root-reducer';
import {State, OffersType} from '../../../types/types';

export const getOffers = (state: State): OffersType[] => state[NameSpace.offers].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.offers].isDataLoaded;
export const getSelectedCity = (state: State): string => state[NameSpace.offers].selectedCity;
export const getOfferByID = (state: State): OffersType |  undefined => state[NameSpace.offers].offer;
export const getNearbyOffers = (state: State): OffersType[] |  undefined => state[NameSpace.offers].nearbyOffers;
