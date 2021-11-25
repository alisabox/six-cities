import { reviewsData, initialState } from './reviews-reducer';
import { makeFakeReviews } from '../../../utils/mocks';
import { clearPostReviewStatus, getReviewsAction, postReviewAction } from '../../action';
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
    };
    expect(reviewsData(state, getReviewsAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
      });
  });

  it('should update reviews and post status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: false,
    };
    expect(reviewsData(state, postReviewAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: true,
      });
  });

  it('should clear post status', () => {
    const state = {
      reviews: adaptedReviews,
      postSuccess: true,
    };
    expect(reviewsData(state, clearPostReviewStatus()))
      .toEqual({
        reviews: adaptedReviews,
        postSuccess: false,
      });
  });
});
