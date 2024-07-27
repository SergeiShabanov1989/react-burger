import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/reducer';
import { useParams } from 'react-router-dom';
import { getViewableOrder } from '../../services/viewable-order/reducer';
import { getAllIngredients } from '../../services/burger-ingredients/reducer';
import { getOrders } from '../../services/orders-info/reducer';
import { getProfileOrders } from '../../services/orders-profile-info/reducer';
import { TOrder } from '../utils/types';

import orderInfoStyles from './order-info.module.css';

export const OrderInfo = (): JSX.Element => {
  const viewableOrder = useSelector(getViewableOrder);
  const allIngredients = useSelector(getAllIngredients);
  const orders = useSelector(getOrders);
  const profileOrders = useSelector(getProfileOrders);
  const { id = '' } = useParams();

  const getOrderById = (id: string): TOrder => {
    const foundIngredient = orders.find((order: TOrder) => order._id === id);
    const foundProfileOrder = profileOrders.find(
      (order: TOrder) => order._id === id
    );
    return foundIngredient || foundProfileOrder || ({} as TOrder);
  };

  const order = viewableOrder ? viewableOrder : getOrderById(id);

  const findAllIngredients = allIngredients.filter((ingredient) => {
    return getOrderById(id).ingredients?.includes(ingredient._id);
  });

  const orderDate = order?.createdAt
    ? new Date(order.createdAt)
    : null;
  const arrayWithPrice = findAllIngredients.map((ingredient) => {
    if (ingredient.type === 'bun') {
      return 2 * ingredient.price;
    }
    return ingredient.price;
  });
  const totalPrice = arrayWithPrice.reduce((a, b) => a + b, 0);

  return (
    <div className={`${orderInfoStyles.order_wrapper} mt-15 mb-15 ml-8`}>
      <h3 className="text text_type_digits-default mb-10">
        {`#${order?.number}`}{' '}
      </h3>
      <h4 className="text text_type_main-medium">{order?.name || ''}</h4>
      <p
        className={`${orderInfoStyles.status} text text_type_main-default mb-10`}
      >{`${order?.status ? 'Выполнен' : 'Создан'}`}</p>
      <p className="text text_type_main-medium">Состав:</p>
      <div className={`${orderInfoStyles.ingredient_container} mb-6`}>
        {findAllIngredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className={`${orderInfoStyles.ingredient_wrapper} mb-4`}
          >
            <div className={orderInfoStyles.ingredient_info}>
              <img
                className={`${orderInfoStyles.ingredient} mr-4`}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
              <p
                className={`${orderInfoStyles.ingredient_name} text text_type_main-default`}
              >
                {ingredient.name}
              </p>
            </div>
            <div className={`${orderInfoStyles.price_wrapper} mr-6`}>
              <p className="text text_type_digits-default mr-2">{`${ingredient.type === 'bun' ? 2 : 1} x ${ingredient.price}`}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${orderInfoStyles.bottom_wrapper}`}>
        <FormattedDate
          date={orderDate ?? new Date()}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={`${orderInfoStyles.price_wrapper} mr-6`}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
