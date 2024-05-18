import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <div className={headerStyles.header_container}>
      <header className={headerStyles.header}>
        <nav className={`${headerStyles.menu} pb-4 pt-4`}>
          <ul className={`${headerStyles.list} pb-5 pt-5`}>
            <li className={`${headerStyles.item} pb-5 pt-5 mr-2`}>
              <a href="#" className={`${headerStyles.link}`}>
                <BurgerIcon type="primary" />
                <p
                  className={`${headerStyles.link_text} text_type_main-default pl-2`}
                >
                  Конструктор
                </p>
              </a>
            </li>
            <li className={`${headerStyles.item} pb-5 pt-5`}>
              <a href="#" className={headerStyles.link}>
                <ListIcon type="primary" />
                <p
                  className={`${headerStyles.link_text} text_type_main-default pl-2`}
                >
                  Лента заказов
                </p>
              </a>
            </li>
          </ul>
        </nav>
        <Logo type="primary" />
        <nav className={headerStyles.menu}>
          <ul className={headerStyles.list}>
            <li className={`${headerStyles.item} pb-5 pt-5`}>
              <a href="#three" className={headerStyles.link}>
                <ProfileIcon type="primary" />
                <p
                  className={`${headerStyles.link_text} text_type_main-default pl-2`}
                >
                  Личный кабинет
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
