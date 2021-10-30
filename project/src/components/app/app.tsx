import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import MainScreen from '../main/main';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';
import PropertyScreen from '../property/property';
import Screen404 from '../screen-404/screen-404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import {ReviewsType} from '../../types/types';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../const/const';
import {State} from '../../types/types';

const mapStateToProps = ({offers, authorizationStatus, isDataLoaded}: State) => ({
  offers,
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type AppScreenProps = {
  reviews: ReviewsType[];
}

type PropsFromRedux = ConnectedProps<typeof connector> & AppScreenProps;

function App(props: PropsFromRedux): JSX.Element {
  const {offers, reviews, authorizationStatus, isDataLoaded} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path={AppRoute.OFFER}>
          <PropertyScreen reviews={reviews} offers={offers}/>
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
