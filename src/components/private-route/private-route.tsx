import { Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/const';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { useAppSelector } from '../../hooks/useAppSelector';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? props.children : <Navigate to="/login" />;
}

export default PrivateRoute;