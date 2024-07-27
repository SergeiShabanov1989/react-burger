import { useDispatch } from '../../services/reducer';
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
import { FeedInfoPage } from '../../pages/feed-info';
import { UserPage } from '../../pages/user';
import { IngredientPage } from '../../pages/ingredient';
import { FeedPage } from '../../pages/feed';
import { OrderInfo } from '../../components/order-info/order-info';
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

function App(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const onclose = (): void => {
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
        <Route path="/feed">
          <Route index element={<FeedPage />} />
          <Route path="/feed/:id" element={<FeedInfoPage />} />
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
        <Route
          path="user/orders/:id"
          element={<OnlyAuthorized component={<FeedInfoPage />} />}
        />
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
      {state?.backgroundLocation && location.hash === '#order-info' && (
        <Routes>
          <Route
            path="feed/:id"
            element={
              <Modal onClose={onclose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
      {state?.backgroundLocation && location.hash === '#user-order' && (
        <Routes>
          <Route
            path="/user/orders/:id"
            element={
              <Modal onClose={onclose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
