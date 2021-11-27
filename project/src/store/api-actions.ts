import { OffersType, ThunkActionResult, AuthData, ReviewsType, PostReviewType } from '../types/types';
import { getFavoriteOffers, getNearByOffers, getOfferByID, getOffers, getReviewsAction, postReviewAction, redirectToRoute, removeFromFavoriteOffers, requireAuthorization, requireLogout, clearFavoriteOffers, addToFavoriteOffers, postReviewError } from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute, TypeOfFavoriteAction, FailMessages } from '../const/const';
import { toast } from 'react-toastify';

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

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewsType[]>(`${APIRoute.REVIEWS}/${id}`);
    dispatch(getReviewsAction(data));
  };

export const postReview = (id: number, review: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewsType[]>(`${APIRoute.REVIEWS}/${id}`, review);
      dispatch(postReviewAction(data));
    } catch {
      toast.info(FailMessages.POST);
      dispatch(postReviewError());
    }
  };

export const fetchFavoriteOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OffersType[]>(APIRoute.FAVORITE);
    if (data) {
      dispatch(getFavoriteOffers(data));
    }
  };

export const addToFavorites = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<OffersType>(`${APIRoute.FAVORITE}/${id}/${TypeOfFavoriteAction.ADDITION_TO_FAVOTITE}`);
      dispatch(addToFavoriteOffers(data));
    } catch (error) {
      toast.info(FailMessages.ADD_TO_FAVORITES);
    }
  };

export const removeFromFavorites = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<OffersType>(`${APIRoute.FAVORITE}/${id}/${TypeOfFavoriteAction.REMOVAL_FROM_FAVOTITE}`);
      dispatch(removeFromFavoriteOffers(data));
    } catch (error) {
      toast.info(FailMessages.REMOVE_FROM_FAVORITES);
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
    fetchFavoriteOffers();
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.LOGOUT);
    dropToken();
    dispatch(requireLogout());
    dispatch(clearFavoriteOffers());
  };
