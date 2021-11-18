import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, loginAction, fetchDataAction, fetchOfferByIDAction, fetchReviewsAction, postReview, fetchFavoriteOffers, addToFavorites, removeFromFavorites, logoutAction } from './api-actions';
import { APIRoute, AuthorizationStatus, AppRoute, TypeOfFavoriteAction } from '../const/const';
import { State, AuthData } from '../types/types';
import { redirectToRoute, requireAuthorization, getOffers, getOfferByID, getReviewsAction, postReviewAction, getFavoriteOffers, addToFavoriteOffers, removeFromFavoriteOffers, requireLogout, clearFavoriteOffers } from './action';
import { makeFakeOffers, makeFakeReviews } from '../utils/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status be «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.LOGIN)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });
  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};
    mockAPI
      .onPost(APIRoute.LOGIN)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth, fakeUser.login),
      redirectToRoute(AppRoute.ROOT),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-auth-token', 'secret');
  });
  it('should dispatch requireLogout and clearFavoriteOffers when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.LOGOUT)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
      clearFavoriteOffers(),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-auth-token');
  });

  it('should dispatch getOffers when GET /offers', async () => {
    const mockOffers = [makeFakeOffers()];
    mockAPI
      .onGet(APIRoute.OFFERS)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchDataAction());

    expect(store.getActions()).toEqual([
      getOffers(mockOffers),
    ]);
  });

  it('should dispatch getOfferByID when GET /offer/:id', async () => {
    const mockOffer = makeFakeOffers();
    mockAPI
      .onGet(`${APIRoute.OFFERS}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferByIDAction(mockOffer.id));

    expect(store.getActions()).toEqual([
      getOfferByID(mockOffer),
    ]);
  });

  it('should redirect to page Not Found when GET /offer/:id is rejected', async () => {
    const mockOffer = makeFakeOffers();
    mockAPI
      .onGet(`${APIRoute.OFFERS}/${mockOffer.id}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchOfferByIDAction(mockOffer.id));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NOT_FOUND),
    ]);
  });

  it('should dispatch getReviewsAction when GET /reviews/:id', async () => {
    const mockOffer = makeFakeOffers();
    const mockReviews = [makeFakeReviews()];
    mockAPI
      .onGet(`${APIRoute.REVIEWS}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockOffer.id));

    expect(store.getActions()).toEqual([
      getReviewsAction(mockReviews),
    ]);
  });

  it('should dispatch postReviewAction when POST /reviews/:id', async () => {
    const mockOffer = makeFakeOffers();
    const mockReview = makeFakeReviews();
    mockAPI
      .onPost(`${APIRoute.REVIEWS}/${mockOffer.id}`)
      .reply(200, [mockReview]);

    const store = mockStore();
    await store.dispatch(postReview(mockOffer.id, mockReview));

    expect(store.getActions()).toEqual([
      postReviewAction([mockReview]),
    ]);
  });

  it('should dispatch getFavoriteOffers when GET /favorite', async () => {
    const mockOffers = [makeFakeOffers()];
    mockAPI
      .onGet(APIRoute.FAVORITE)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoriteOffers());

    expect(store.getActions()).toEqual([
      getFavoriteOffers(mockOffers),
    ]);
  });

  it('should not dispatch getFavoriteOffers when GET /favorite doesn\'t return data', async () => {
    mockAPI
      .onGet(APIRoute.FAVORITE)
      .reply(200);

    const store = mockStore();
    await store.dispatch(fetchFavoriteOffers());

    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch addToFavoriteOffers when POST /favorite/add', async () => {
    const mockOffer = makeFakeOffers();
    mockAPI
      .onPost(`${APIRoute.FAVORITE}/${mockOffer.id}/${TypeOfFavoriteAction.ADD_TO_FAVOTITE}`)
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(addToFavorites(mockOffer.id));

    expect(store.getActions()).toEqual([
      addToFavoriteOffers(mockOffer),
    ]);
  });

  it('should dispatch removeFromFavoriteOffers when POST /favorite/remove', async () => {
    const mockOffer = makeFakeOffers();
    mockAPI
      .onPost(`${APIRoute.FAVORITE}/${mockOffer.id}/${TypeOfFavoriteAction.REMOVE_FROM_FAVOTITE}`)
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(removeFromFavorites(mockOffer.id));

    expect(store.getActions()).toEqual([
      removeFromFavoriteOffers(mockOffer),
    ]);
  });
});
