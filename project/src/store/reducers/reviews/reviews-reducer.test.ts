import { reviewsData, initialState } from './reviews-reducer';
import { makeFakeReviews } from '../../../utils/mocks';
import { clearPostReviewStatus, getReviewsAction, postReviewAction, postReviewError, clearPostReviewError } from '../../action';
import { adaptReviewsToClient } from '../../../const/const';

const reviews = [makeFakeReviews()];
const adaptedReviews = reviews.map((review) => adaptReviewsToClient(review));

describe('Function: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update reviews on data load', () => {
    const state = {
      reviews: undefined,
      postSuccess: false,
      postError: false,
    };
    expect(reviewsData(state, getReviewsAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
        postError: false,
      });
  });

  it('should update reviews and post status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: false,
      postError: false,
    };
    expect(reviewsData(state, postReviewAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: true,
        postError: false,
      });
  });

  it('should update error status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: false,
      postError: false,
    };
    expect(reviewsData(state, postReviewError()))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
        postError: true,
      });
  });

  it('should clear post status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: true,
      postError: false,
    };
    expect(reviewsData(state, clearPostReviewStatus()))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
        postError: false,
      });
  });

  it('should clear post error status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: false,
      postError: true,
    };
    expect(reviewsData(state, clearPostReviewError()))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
        postError: false,
      });
  });
});
