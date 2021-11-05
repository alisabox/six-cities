import {OffersType, ThunkActionResult, AuthData, ReviewsType, PostReviewType} from '../types/types';
import {getNearByOffers, getOfferByID, getOffers, getReviews, postReviewAction, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const/const';
import {toast} from 'react-toastify';

const POST_FAIL_MESSAGE = 'Unable to send the message. Check your internet connection';

export const fetchDataAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OffersType[]>(APIRoute.OFFERS);
    dispatch(getOffers(data));
  };

export const fetchOfferByIDAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<OffersType>(`${APIRoute.OFFERS}/${id}`);
      dispatch(getOfferByID(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NOT_FOUND));
    }
  };

export const fetchNearByOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OffersType[]>(`${APIRoute.OFFERS}/${id}/nearby`);
    dispatch(getNearByOffers(data));
  };

export const fetchReviews = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewsType[]>(`${APIRoute.REVIEWS}/${id}`);
    dispatch(getReviews(data));
  };

export const postReview = (id: number, review: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewsType[]>(`${APIRoute.REVIEWS}/${id}`, review);
      dispatch(postReviewAction(data));
    } catch {
      toast.info(POST_FAIL_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.LOGIN)
      .then((response) => {
        if (response.data) {
          dispatch(requireAuthorization(AuthorizationStatus.Auth, response.data.email));
        }
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.LOGIN, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth, email));
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.LOGOUT);
    dropToken();
    dispatch(requireLogout());
  };
