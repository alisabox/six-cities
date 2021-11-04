import {MouseEvent} from 'react';
import {Dispatch, bindActionCreators} from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus } from '../../const/const';
import { State } from '../../types/types';
import { logoutAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';

const mapStateToProps = ({authorizationStatus, userEmail}: State) => ({
  authorizationStatus,
  userEmail,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onLogout: logoutAction,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserNavigation({authorizationStatus, userEmail, onLogout}: PropsFromRedux): JSX.Element {

  const handleLogoutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <ul className="header__nav-list">
      {
        authorizationStatus === AuthorizationStatus.Auth
          ?
          <>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="/">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
              </a>
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
  );
}

export {UserNavigation};
export default connector(UserNavigation);
