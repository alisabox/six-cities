import { createReducer } from '@reduxjs/toolkit';
import { ReviewsState } from '../../../types/types';
import { adaptReviewsToClient } from '../../../const/const';
import { clearPostReviewStatus, getReviewsAction, postReviewAction } from '../../action';

export const initialState: ReviewsState = {
  reviews: undefined,
  postSuccess: false,
};

export const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(getReviewsAction, (state, action) => {
      state.reviews = action.payload.reviews?.map((item)  => adaptReviewsToClient(item));
    })
    .addCase(postReviewAction, (state, action) => {
      state.reviews = action.payload.reviews?.map((item)  => adaptReviewsToClient(item));
      state.postSuccess = true;
    })
    .addCase(clearPostReviewStatus, (state) => {
      state.postSuccess = initialState.postSuccess;
    });
});
