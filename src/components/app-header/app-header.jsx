import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <div className={headerStyles.header_container}>
      <header className={headerStyles.header}>
        <nav className={`${headerStyles.menu} pb-4 pt-4`}>
          <ul className={`${headerStyles.list} pb-5 pt-5`}>
            <li className={`${headerStyles.item} pb-5 pt-5 mr-2`}>
              <NavLink to="ingredients" className={`${headerStyles.link} mr-8`}>
                {({ isActive }) => (
                  <>
                    <BurgerIcon
                      {...(isActive
                        ? { type: 'primary' }
                        : { type: 'secondary' })}
                    />
                    <p
                      className={`${isActive ? headerStyles.link_text_active : headerStyles.link_text} text text_type_main-default pl-2`}
                    >
                      Конструктор
                    </p>
                  </>
                )}
              </NavLink>
            </li>
            <li className={`${headerStyles.item} pb-5 pt-5`}>
              <NavLink to="order-feed" className={`${headerStyles.link} mr-8`}>
                {({ isActive }) => (
                  <>
                    <ListIcon
                      {...(isActive
                        ? { type: 'primary' }
                        : { type: 'secondary' })}
                    />
                    <p
                      className={`${isActive ? headerStyles.link_text_active : headerStyles.link_text} text text_type_main-default pl-2`}
                    >
                      Лента заказов
                    </p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>

          <Logo type="primary" />
        </nav>
        <nav className={`${headerStyles.menu}`}>
          <ul className={headerStyles.list}>
            <li className={`${headerStyles.item} pb-5 pt-5`}>
              <NavLink to="user" className={`${headerStyles.link}`}>
                {({ isActive }) => (
                  <>
                    <ProfileIcon
                      {...(isActive
                        ? { type: 'primary' }
                        : { type: 'secondary' })}
                    />
                    <p
                      className={`${isActive ? headerStyles.link_text_active : headerStyles.link_text} text text_type_main-default pl-2`}
                    >
                      Личный кабинет
                    </p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
