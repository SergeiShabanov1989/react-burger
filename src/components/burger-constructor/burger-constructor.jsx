import PropTypes from 'prop-types';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { selectedIngredients } from '../utils/data';

import ConstructorStyles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const bunsIngredients = selectedIngredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );
  const mainIngredients = selectedIngredients.filter(
    (ingredient) => ingredient.type === 'main'
  );

  const entireCurrency = selectedIngredients.reduce(
    (acc, number) => acc + number.price,
    0
  );

  return (
    <section className={`${ConstructorStyles.section} mt-25`}>
      <div className={`${ConstructorStyles.constructor_wrapper}`}>
        <div className={`${ConstructorStyles.item_wrapper} pl-6 mb-4`}>
          {bunsIngredients.map((ingredient) => (
            <ConstructorElement
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              isLocked={true}
            />
          ))}
        </div>
        <div className={`${ConstructorStyles.constructor} mb-4`}>
          {mainIngredients.map((ingredient) => (
            <div className={`${ConstructorStyles.ingredient_wrapper} mr-2`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
        <div className={`${ConstructorStyles.item_wrapper} pl-6`}>
          {bunsIngredients.map((ingredient) => (
            <ConstructorElement
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              isLocked={true}
            />
          ))}
        </div>
      </div>
      <div className={`${ConstructorStyles.buy_button_wrapper} pr-10 mt-10`}>
        <div className={`${ConstructorStyles.currency_wrapper} mr-10`}>
          <p
            className={`${ConstructorStyles.text} text_type_digits-medium mr-2`}
          >
            {entireCurrency}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  bunsIngredients: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
