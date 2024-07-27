import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/reducer';
import {
  getOrders,
  getTotal,
  getTotalToday,
} from '../services/orders-info/reducer';
import {
  setViewableOrder,
  setIsModalOrderOpen,
} from '../services/viewable-order/reducer';
import { FeedElement } from '../components/feed-element/feed-element';
import { wsConnect, wsDisconnect } from '../services/orders-info/actions';

import feedStyles from './feed.module.css';

export const FeedPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(getOrders);
  const totalOrders = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  useEffect(() => {
    dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const ordersReady = orders.filter((order) => order.status === 'done');
  const ordersNotReady = orders.filter((order) => order.status !== 'done');

  return (
    <section className={`${feedStyles.section}`}>
      <div className={`${feedStyles.body} mt-10`}>
        <div className={`${feedStyles.feed_container}`}>
          <h1 className={`text text_type_main-large mt-10 mb-5`}>
            Лента заказов
          </h1>
          <div className={`${feedStyles.container} mt-10`}>
            {orders.map((orders) => (
              <Link
                key={orders._id}
                to={{
                  pathname: `/feed/${orders._id}`,
                  hash: '#order-info',
                }}
                state={{ backgroundLocation: location }}
                className={`${feedStyles.link}`}
                onClick={() => {
                  dispatch(setViewableOrder(orders));
                  dispatch(setIsModalOrderOpen(true));
                }}
              >
                <FeedElement key={orders._id} {...orders} />
              </Link>
            ))}
          </div>
        </div>
        <div className={`${feedStyles.info_container} mt-15`}>
          <div className={`${feedStyles.progress_container} mt-10 `}>
            <div className={`${feedStyles.progress}`}>
              <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
              {ordersReady
                .map((order) => (
                  <p
                    className={`${feedStyles.digits} text text_type_digits-default`}
                    key={order._id}
                  >
                    {order.number}
                  </p>
                ))
                .slice(0, 5)}
            </div>
            <div className={`${feedStyles.progress}`}>
              <p className={`text text_type_main-medium mb-6`}>В работе:</p>
              {ordersNotReady.map((order) => (
                <p className={`text text_type_digits-default`} key={order._id}>
                  {order.number}
                </p>
              ))}
            </div>
          </div>
          <div className={`${feedStyles.period_container} mt-15`}>
            <p className={`text text_type_main-medium mt-10 mb-5`}>
              Выполнено за все время:
            </p>
            <p className={`text text_type_digits-large`}>{totalOrders}</p>
          </div>
          <div>
            <p className={`text text_type_main-medium mt-10 mb-5`}>
              Выполнено за сегодня:
            </p>
            <p className={`text text_type_digits-large`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
