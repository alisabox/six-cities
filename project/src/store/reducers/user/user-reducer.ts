import { UserState } from '../../../types/types';
import { AuthorizationStatus } from '../../../const/const';
import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout } from '../../action';

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.userEmail = action.payload.email;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
