import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPage } from '../../pages/forgot-password';
import { ResetPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { OrdersPage } from '../../pages/orders';
import { UserPage } from '../../pages/user';
import { IngredientPage } from '../../pages/ingredient';
import { Modal } from '../modal/modal';
import { checkUserAuth } from '../../services/user/actions';
import { getIngredients } from '../../services/burger-ingredients/actions';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { setIsModalIngredientOpen } from '../../services/viewable-ingredient/reducer';
import {
  OnlyUnAuthorized,
  OnlyAuthorized,
  OnlyAfterEmailCheck,
} from '../protected-route/protected-route';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const onclose = () => {
    dispatch(setIsModalIngredientOpen(false));
    navigate(-1);
  };
  let state = location.state;

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/ingredients">
          <Route index element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Route>
        <Route
          path="login"
          element={<OnlyUnAuthorized component={<LoginPage />} />}
        />
        <Route
          path="register"
          element={<OnlyUnAuthorized component={<RegisterPage />} />}
        />
        <Route
          path="forgot-password"
          element={<OnlyUnAuthorized component={<ForgotPage />} />}
        />
        <Route
          path="reset-password"
          element={<OnlyAfterEmailCheck component={<ResetPage />} />}
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
      {state?.backgroundLocation && location.hash === '#modal-ingredient' && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={onclose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
