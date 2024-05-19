import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import popupStyles from './popup.module.css';

export const Popup = (props) => {
  const dataPopup = {
    _id: '60666c42cc7b410027a1a9b3',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
  };

  return (
    <div className={`${popupStyles.popup}`}>
      <div className={`${popupStyles.popup_container}`}>
        <CloseIcon type="primary" />
        <h3 className="text text_type_main-large">Детали ингредиента</h3>
        <img src={dataPopup.image_large} alt={dataPopup.name} />
        <h4 className="text text_type_main-medium">{dataPopup.name}</h4>
        <ul className={popupStyles.calories_wrapper}>
          <li>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал:
            </p>
            <p className="text text_type_digits-default text_color_inactive">{dataPopup.calories}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">{dataPopup.proteins}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">{dataPopup.fat}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">{dataPopup.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
