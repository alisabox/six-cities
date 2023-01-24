import { userProcess, initialState } from './user-reducer';
import { makeFakeUserEmail } from '../../../utils/mocks';
import { requireAuthorization, requireLogout } from '../../action';
import { AuthorizationStatus } from '../../../const/const';

const fakeUserEmail = makeFakeUserEmail();

describe('Function: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update status on authorization failure', () => {
    const state = initialState;
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: initialState.userEmail,
      });
  });

  it('should update status and email on authorization success', () => {
    const state = initialState;
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.Auth, fakeUserEmail)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: fakeUserEmail,
      });
  });

  it('should clear status and email on logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: fakeUserEmail,
    };
    expect(userProcess(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: initialState.userEmail,
      });
  });
});
