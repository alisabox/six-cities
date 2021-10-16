import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainScreen from '../main/main';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import FavoritesScreenEmpty from '../favorites-empty/favorites-empty';
import PropertyScreen from '../property/property';
import Screen404 from '../screen-404/screen-404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import {OffersType, ReviewsType} from '../../types/types';

type AppScreenProps = {
  cardsNumber: number;
  offers: OffersType[];
  reviews: ReviewsType[];
}

function App(props: AppScreenProps): JSX.Element {
  const {cardsNumber, offers, reviews} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <MainScreen cardsNumber={cardsNumber} offers={offers}/>
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
          <PropertyScreen reviews={reviews}/>
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
