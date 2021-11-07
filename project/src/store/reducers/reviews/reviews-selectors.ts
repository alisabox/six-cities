import { NameSpace } from '../root-reducer';
import { State, ReviewsType } from '../../../types/types';

export const getReviews = (state: State): ReviewsType[] | undefined => state[NameSpace.reviews].reviews;
export const getReviewPostStatus = (state: State): boolean => state[NameSpace.reviews].isPostSuccessfull;
