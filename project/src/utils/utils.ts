import { ThunkActionResult } from '../types/types';
import { redirectToRoute } from '../store/action';
import { removeFromFavorites, addToFavorites } from '../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../const/const';

export const handleFavoriteClickAction = (status: AuthorizationStatus, isFavorite: boolean, id: number): ThunkActionResult =>
  async (dispatch, _getState): Promise<void> => {
    if (status !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.LOGIN));
    } else if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };
