import { NameSpace } from '../root-reducer';
import { State } from '../../../types/types';
import { AuthorizationStatus } from '../../../const/const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getUserEmail = (state: State): string | undefined => state[NameSpace.user].userEmail;
