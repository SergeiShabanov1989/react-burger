import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userStyles from './user.module.css';
import { logout } from '../services/user/actions';

export function UserPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // @ts-ignore
    dispatch(logout());
  };
  return (
    <section className={userStyles.section}>
      <div className={userStyles.body}>
        <nav className={`${userStyles.nav} mr-15`}>
          <NavLink
            to="/user/profile"
            className={({ isActive }) => {
              return `${
                isActive
                  ? `${userStyles.link} text_color_primary`
                  : `${userStyles.link} text_color_inactive`
              } text text_type_main-medium mb-6 mt-6`;
            }}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/user/orders"
            className={({ isActive }) => {
              return `${
                isActive
                  ? `${userStyles.link} text_color_primary`
                  : `${userStyles.link} text_color_inactive`
              } text text_type_main-medium mb-6 mt-6`;
            }}
          >
            История заказов
          </NavLink>
          <button
            className={`${userStyles.button} text text_type_main-medium mb-6 mt-6 text_color_inactive`}
            type="button"
            onClick={handleLogout}
          >
            Выход
          </button>

          {pathname === '/user/orders' ? (
            <p
              className={`${userStyles.text} text text_type_main-small text_color_inactive mt-10`}
            >
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          ) : (
            <p
              className={`${userStyles.text} text text_type_main-small text_color_inactive mt-10`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          )}
        </nav>
        <Outlet />
      </div>
    </section>
  );
}
