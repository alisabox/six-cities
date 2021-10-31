import {OffersType, ThunkActionResult, AuthData} from '../types/types';
import {getOffers, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const/const';

export const fetchDataAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OffersType[]>(APIRoute.OFFERS);
    dispatch(getOffers(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.LOGIN)
      .then((response) => dispatch(requireAuthorization(AuthorizationStatus.Auth, response.data.email)));
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
