import { useEffect } from 'react';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../services/reducer';
import { useParams } from 'react-router-dom';
import { Preloader } from '../components/preloader/preloader';
import { getViewableOrder } from '../services/viewable-order/reducer';
import { getAllIngredients } from '../services/burger-ingredients/reducer';
import { getOrders } from '../services/orders-info/reducer';
import { getOrder } from '../services/order/reducer';
import { orderFromServer } from '../services/order/actions';
import { TOrder } from '../components/utils/types';
import { wsConnect, wsDisconnect } from '../services/orders-info/actions';

import feedInfoStyles from './feed-info.module.css';

export const FeedInfoPage = (): JSX.Element => {
  const viewableOrder = useSelector(getViewableOrder);
  const allIngredients = useSelector(getAllIngredients);
  const { isLoading } = useSelector((state) => state.ingredients);
  const orders = useSelector(getOrders);
  const orderApi = useSelector(getOrder);
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    dispatch(orderFromServer(id));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const getOrderById = (id: string): TOrder => {
    const foundIngredient = orders.find((order: TOrder) => order._id === id);
    return foundIngredient || ({} as TOrder);
  };

  const order = orderApi || viewableOrder ? orderApi || viewableOrder : getOrderById(id);

  const findAllIngredients = allIngredients.filter((ingredient) => {
    if (orderApi) {
      return orderApi.ingredients?.includes(ingredient._id);
    }
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

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={`${feedInfoStyles.order_wrapper} mt-15 mb-15 ml-8`}>
      <div className={`${feedInfoStyles.container} mb-15`}>
        <h3
          className={`${feedInfoStyles.number} text text_type_digits-default mb-10`}
        >
          {`#${order?.number}`}
        </h3>
        <h4 className="text text_type_main-medium">{order?.name || ''}</h4>
        <p
          className={`${feedInfoStyles.status} text text_type_main-default mb-10`}
        >{`${order?.status ? 'Выполнен' : 'Создан'}`}</p>
        <p className="text text_type_main-medium mb-8">Состав:</p>
        <div className={`${feedInfoStyles.ingredient_container} mb-6`}>
          {findAllIngredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className={`${feedInfoStyles.ingredient_wrapper} mb-4`}
            >
              <div className={feedInfoStyles.ingredient_info}>
                <img
                  className={`${feedInfoStyles.ingredient} mr-4`}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                <p
                  className={`${feedInfoStyles.ingredient_name} text text_type_main-default`}
                >
                  {ingredient.name}
                </p>
              </div>
              <div className={`${feedInfoStyles.price_wrapper} mr-6`}>
                <p className="text text_type_digits-default mr-2">{`${ingredient.type === 'bun' ? 2 : 1} x ${ingredient.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={`${feedInfoStyles.bottom_wrapper}`}>
          <FormattedDate
            date={orderDate ?? new Date()}
            className="text text_type_main-default text_color_inactive"
          />
          <div className={`${feedInfoStyles.price_wrapper} mr-6`}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
