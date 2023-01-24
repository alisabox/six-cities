import { offersData, initialState } from './offers-reducer';
import { makeFakeOffers } from '../../../utils/mocks';
import { getOffers, getOfferByID, getNearByOffers, clearOfferByID, getFavoriteOffers, clearFavoriteOffers, addToFavoriteOffers, removeFromFavoriteOffers } from '../../action';
import { adaptToClient } from '../../../const/const';

const offers = [makeFakeOffers()];
const adaptedOffers = offers.map((offer) => adaptToClient(offer));

const offer = makeFakeOffers();
const adaptedOffer = adaptToClient(offer);

describe('Function: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update offers on data load', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: false,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: adaptedOffers,
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });

  it('should get offer, which was fetched by its ID', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getOfferByID(offer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: adaptedOffer,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });

  it('should get near-by offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: adaptedOffer,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getNearByOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: adaptedOffer,
        nearbyOffers: adaptedOffers,
        favoriteOffers: [],
      });
  });
  it('should clear offer, which was fetched by its ID', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: adaptedOffer,
      nearbyOffers: adaptedOffers,
      favoriteOffers: [],
    };
    expect(offersData(state, clearOfferByID()))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: initialState.offer,
        nearbyOffers: initialState.nearbyOffers,
        favoriteOffers: [],
      });
  });

  it('should get favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, getFavoriteOffers(offers)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: adaptedOffers,
      });
  });
  it('should clear favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: adaptedOffers,
    };
    expect(offersData(state, clearFavoriteOffers()))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: initialState.offer,
        nearbyOffers: initialState.nearbyOffers,
        favoriteOffers: initialState.favoriteOffers,
      });
  });

  it('should add offer to favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [],
    };
    expect(offersData(state, addToFavoriteOffers(offer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [adaptedOffer],
      });
  });

  it('should remove offer to favorite offers', () => {
    const state = {
      selectedCity: 'Paris',
      offers: [],
      isDataLoaded: true,
      offer: undefined,
      nearbyOffers: undefined,
      favoriteOffers: [adaptedOffer],
    };
    expect(offersData(state, removeFromFavoriteOffers(adaptedOffer)))
      .toEqual({
        selectedCity: 'Paris',
        offers: [],
        isDataLoaded: true,
        offer: undefined,
        nearbyOffers: undefined,
        favoriteOffers: [],
      });
  });
});
