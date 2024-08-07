import { useSelector, useDispatch } from '../../services/reducer';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { ConstructorIngredients } from '../constructor-ingredients/constructor-ingredients';
import { setIsModalOrderOpen } from '../../services/order-details/reducer';
import { ingredientsPriceSelector } from '../../services/constructor-ingredients/selectors';
import { setConstructorIngredients } from '../../services/constructor-ingredients/reducer';
import { sendOrder } from '../../services/constructor-ingredients/actions';
import { getUser } from '../../services/user/reducer';
import { TConstructorIngredient } from '../utils/types';

import ConstructorStyles from './burger-constructor.module.css';

export const BurgerConstructor = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { IsModalOpen } = useSelector((state) => state.orderDetails);
  const { constructorIngredients, buns } = useSelector(
    (state) => state.constructorIngredients
  );
  const fullPriceIngredients = useSelector(ingredientsPriceSelector);

  const [{ isHover }, dropTarget] = useDrop({
    accept: ['main', 'sauce', 'bun'],
    drop(itemId: TConstructorIngredient) {
      dispatch(setConstructorIngredients(itemId));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const submitOrder = (): void => {
    if (!user) {
      return navigate('/login');
    } else {
      dispatch(setIsModalOrderOpen(true));
      const pushOrder = constructorIngredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      );
      if (buns) {
        const bunsPlusIngredients = [...pushOrder, buns._id];
        dispatch(sendOrder({ ingredients: bunsPlusIngredients }));
      }
    }
  };

  const onclose = (): void => {
    dispatch(setIsModalOrderOpen(false));
  };

  return (
    <section className={`${ConstructorStyles.section} mt-25`}>
      <div
        ref={dropTarget}
        className={`${ConstructorStyles.constructor_wrapper}${isHover ? ` ${ConstructorStyles.constructor_element}` : ''}`}
      >
        <div
          data-testid="drop-target"
          className={`${ConstructorStyles.item_wrapper} pl-6 mb-4`}
        >
          {buns ? (
            <ConstructorElement
              key={buns.key}
              text={`${buns.name} (вверх)`}
              price={buns.price}
              thumbnail={buns.image}
              isLocked={true}
            />
          ) : (
            <div className={`${ConstructorStyles.empty_item} pl-6 mb-4`}></div>
          )}
        </div>
        <div className={`${ConstructorStyles.constructor}  mb-4`}>
          {constructorIngredients.map(
            (ingredient: TConstructorIngredient, index: number) => (
              <ConstructorIngredients
                key={ingredient.key}
                id={ingredient._id}
                ingredient={ingredient}
                index={index}
              />
            )
          )}
        </div>

        <div className={`${ConstructorStyles.item_wrapper} pl-6`}>
          {buns ? (
            <ConstructorElement
              key={buns.key}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
              isLocked={true}
            />
          ) : (
            <div className={`${ConstructorStyles.empty_item} pl-6 mb-4`}></div>
          )}
        </div>
      </div>
      <div className={`${ConstructorStyles.buy_button_wrapper} pr-10 mt-10`}>
        <div className={`${ConstructorStyles.currency_wrapper} mr-10`}>
          <p
            className={`${ConstructorStyles.text} text_type_digits-medium mr-2`}
          >
            {fullPriceIngredients}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          {...(fullPriceIngredients ? {} : { disabled: true })}
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            submitOrder();
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {IsModalOpen && (
        <Modal onClose={onclose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
