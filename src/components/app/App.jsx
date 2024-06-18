import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPage } from '../../pages/forgot-password';
import { ResetPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { OrdersPage } from '../../pages/orders';
import { UserPage } from '../../pages/user';
import { checkUserAuth } from '../../services/user/actions';
import {
  OnlyUnAuthorized,
  OnlyAuthorized,
} from '../protected-route/protected-route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<HomePage />} />
        <Route
          path="/login"
          element={<OnlyUnAuthorized component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuthorized component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuthorized component={<ForgotPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuthorized component={<ResetPage />} />}
        />
        <Route
          path="user"
          element={<OnlyAuthorized component={<UserPage />} />}
        >
          <Route index element={<ProfilePage />} />
          <Route
            path="profile"
            element={<OnlyAuthorized component={<ProfilePage />} />}
          />
          <Route
            path="orders"
            element={<OnlyAuthorized component={<OrdersPage />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
