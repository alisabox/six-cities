import {createReducer} from '@reduxjs/toolkit';
import { OffersState } from '../../../types/types';
import { adaptToClient } from '../../../const/const';
import { clearOfferByID, getCity, getNearByOffers, getOfferByID, getOffers } from '../../action';

export const initialState: OffersState = {
  selectedCity: 'Paris',
  offers: [],
  isDataLoaded: false,
  offer: undefined,
  nearbyOffers: undefined,
};

export const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(getCity, (state, action) => {
      state.selectedCity = action.payload.city;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers.map((item)  => adaptToClient(item));
      state.isDataLoaded = true;
    })
    .addCase(getOfferByID, (state, action) => {
      state.offer = adaptToClient(action.payload.offer);
    })
    .addCase(clearOfferByID, (state) => {
      state.offer = initialState.offer;
      state.nearbyOffers = initialState.nearbyOffers;
    })
    .addCase(getNearByOffers, (state, action) => {
      state.nearbyOffers = action.payload.offers?.map((item)  => adaptToClient(item));
    });
});
