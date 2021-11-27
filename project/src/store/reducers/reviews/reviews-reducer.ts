import { createReducer } from '@reduxjs/toolkit';
import { ReviewsState } from '../../../types/types';
import { adaptReviewsToClient } from '../../../const/const';
import { clearPostReviewStatus, getReviewsAction, postReviewAction, postReviewError, clearPostReviewError } from '../../action';

export const initialState: ReviewsState = {
  reviews: undefined,
  postSuccess: false,
  postError: false,
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
    .addCase(postReviewError, (state) => {
      state.postError = true;
    })
    .addCase(clearPostReviewStatus, (state) => {
      state.postSuccess = initialState.postSuccess;
    })
    .addCase(clearPostReviewError, (state) => {
      state.postError = initialState.postError;
    });
});
