import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import {useSelector} from 'react-redux';
import MainScreen from '../main/main';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';
import PropertyScreen from '../property/property';
import Screen404 from '../screen-404/screen-404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const/const';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../const/const';
import browserHistory from '../../browser-history/browser-history';
import { getLoadedDataStatus, getOffers } from '../../store/reducers/offers/offers-selectors';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';


function App(): JSX.Element {
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getLoadedDataStatus);

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <MainScreen offers={offers}/>
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <LoginScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITE}
          render={
            favoriteOffers.length > 0
              ? () => <FavoritesScreen favoriteOffers={favoriteOffers}/>
              : () => <FavoritesScreenEmpty />
          }
        >
        </PrivateRoute>
        <Route path={`${AppRoute.OFFER}/:id`}>
          <PropertyScreen />
        </Route>
        <Route path={AppRoute.NOT_FOUND}>
          <Screen404 />
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
