import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/user/reducer';
import { Preloader } from '../preloader/preloader';
const ProtectedRoute = ({ onlyUnauthorized = false, component }) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnauthorized && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  if (!onlyUnauthorized && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyUnAuthorized = ({ component }) =>
  ProtectedRoute({ onlyUnauthorized: true, component });
export const OnlyAuthorized = ProtectedRoute;
