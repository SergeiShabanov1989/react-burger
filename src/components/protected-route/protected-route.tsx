import { useSelector } from '../../services/reducer';
import { useLocation, Navigate } from 'react-router-dom';
import {
  getIsAuthChecked,
  getUser,
  getIsEmailChecked,
} from '../../services/user/reducer';
import { Preloader } from '../preloader/preloader';

type TProtectedRouteProps = {
  onlyUnauthorized?: boolean;
  onlyAfterEmailCheck?: boolean;
  component: JSX.Element;
}
const ProtectedRoute = ({
  onlyUnauthorized = false,
  onlyAfterEmailCheck = false,
  component,
}: TProtectedRouteProps): JSX.Element => {
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

export const OnlyUnAuthorized = ({ component }: TProtectedRouteProps) =>
  ProtectedRoute({
    onlyUnauthorized: true,
    onlyAfterEmailCheck: false,
    component,
  });

export const OnlyAfterEmailCheck = ({ component }: TProtectedRouteProps) =>
  ProtectedRoute({
    onlyUnauthorized: true,
    onlyAfterEmailCheck: true,
    component,
  });
export const OnlyAuthorized = ProtectedRoute;
