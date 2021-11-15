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
      isPostSuccessfull: false,
    };
    expect(reviewsData(state, getReviewsAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: false,
      });
  });

  it('should update reviews and post status', () => {
    const state = {
      reviews: adaptedReviews,
      isPostSuccessfull: false,
    };
    expect(reviewsData(state, postReviewAction(reviews)))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: true,
      });
  });

  it('should clear post status', () => {
    const state = {
      reviews: adaptedReviews,
      isPostSuccessfull: true,
    };
    expect(reviewsData(state, clearPostReviewStatus()))
      .toEqual({
        reviews: adaptedReviews,
        isPostSuccessfull: false,
      });
  });
});
