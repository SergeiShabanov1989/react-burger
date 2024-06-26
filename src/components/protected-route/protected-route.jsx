import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import {
  getIsAuthChecked,
  getUser,
  getIsEmailChecked,
} from '../../services/user/reducer';
import { Preloader } from '../preloader/preloader';
const ProtectedRoute = ({
  onlyUnauthorized = false,
  onlyAfterEmailCheck = false,
  component,
}) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const isEmailChecked = useSelector(getIsEmailChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnauthorized && user) {
    const { from } = location.state || { from: { pathname: '/ingredients' } };
    return <Navigate to={from} />;
  }
  if (onlyAfterEmailCheck && onlyUnauthorized) {
    return !isEmailChecked ? <Navigate to="/login" /> : component;
  }
  if (!onlyUnauthorized && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyUnAuthorized = ({ component }) =>
  ProtectedRoute({
    onlyUnauthorized: true,
    onlyAfterEmailCheck: false,
    component,
  });

export const OnlyAfterEmailCheck = ({ component }) =>
  ProtectedRoute({
    onlyUnauthorized: true,
    onlyAfterEmailCheck: true,
    component,
  });
export const OnlyAuthorized = ProtectedRoute;
