import { Route, Routes } from 'react-router-dom';
import MainScreen from '../main/main';
import LoginScreen from '../login/login';
import FavoritesScreen from '../favorites/favorites';
import PropertyScreen from '../property/property';
import Screen404 from '../screen-404/screen-404';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const/const';
import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../../const/const';
import { getLoadedDataStatus } from '../../store/reducers/offers/offers-selectors';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { useAppSelector } from '../../hooks/useAppSelector';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<MainScreen />} />
      <Route path={AppRoute.LOGIN} element={<LoginScreen />} />
      <Route path={AppRoute.FAVORITE} element={
        <PrivateRoute>
          <FavoritesScreen />
        </PrivateRoute>
      } />
      <Route path={`${AppRoute.OFFER}/:id`} element={<PropertyScreen />} />
      <Route path={AppRoute.NOT_FOUND} element={<Screen404 />} />
      <Route path={'/*'} element={<Screen404 />} />
    </Routes>
  );
}

export default App;
