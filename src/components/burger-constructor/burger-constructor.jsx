import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import ConstructorStyles from './burger-constructor.module.css';

export const BurgerConstructor = ({ isIngredients }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const bunsIngredients = isIngredients.filter(
    (ingredient) => ingredient.name === 'Краторная булка N-200i'
  );
  const mainIngredients = isIngredients.filter(
    (ingredient) => ingredient.type === 'main' || 'sauce'
  );

  const fullPrice = isIngredients.reduce(
    (acc, number) => acc + number.price,
    0
  );

  return (
    <section className={`${ConstructorStyles.section} mt-25`}>
      <div className={`${ConstructorStyles.constructor_wrapper}`}>
        <div className={`${ConstructorStyles.item_wrapper} pl-6 mb-4`}>
          {bunsIngredients.map((ingredient) => (
            <ConstructorElement
              key={ingredient._id}
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              isLocked={true}
            />
          ))}
        </div>
        <div className={`${ConstructorStyles.constructor} mb-4`}>
          {mainIngredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className={`${ConstructorStyles.ingredient_wrapper} mr-2`}
            >
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
              key={ingredient._id}
              text={`${ingredient.name} (низ)`}
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
            {fullPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setIsOpenModal(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <ModalOverlay setIsOpenModal={setIsOpenModal}>
          <Modal setIsOpenModal={setIsOpenModal}>
            <OrderDetails />
          </Modal>
        </ModalOverlay>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  isIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
};
