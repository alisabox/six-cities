import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { logoutAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { getAuthorizationStatus, getUserEmail } from '../../store/reducers/user/user-selectors';

function UserNavigation(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userEmail = useSelector(getUserEmail);

  const dispatch = useDispatch();

  const handleLogoutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          authorizationStatus === AuthorizationStatus.Auth
            ?
            <>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITE}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{userEmail}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="/">
                  <span className="header__signout" onClick={handleLogoutClick}>Sign out</span>
                </a>
              </li>
            </>
            :
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/login">
                <span className="header__signout">Sign in</span>
              </Link>
            </li>
        }
      </ul>
    </nav>
  );
}

export default UserNavigation;
