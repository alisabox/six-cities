import { NameSpace } from '../root-reducer';
import { State, OffersType, ReselectType } from '../../../types/types';
import { createSelector } from 'reselect';

export const getOffers = (state: State): OffersType[] => state[NameSpace.offers].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.offers].isDataLoaded;
export const getSelectedCity = (state: State): string => state[NameSpace.offers].selectedCity;
export const getOfferByID = (state: State): OffersType |  undefined => state[NameSpace.offers].offer;
export const getNearbyOffers = (state: State): OffersType[] |  undefined => state[NameSpace.offers].nearbyOffers;
export const getFavoriteOffers = (state: State): OffersType[] => state[NameSpace.offers].favoriteOffers;
export const getFavoriteOffersMemo = (id: number): ReselectType<boolean> => createSelector(getFavoriteOffers, (favoriteOffers) => favoriteOffers?.filter((item) => item.id === id).length > 0);
export const getOffersInSelectedCity = (selectedCity: string): ReselectType<OffersType[]> => createSelector(getOffers, (offers) => (offers.filter((offer) =>  offer.city.name === selectedCity)));
