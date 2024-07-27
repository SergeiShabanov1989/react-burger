import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/reducer';
import {
  getProfileOrders,
} from '../services/orders-profile-info/reducer';
import {
  setViewableOrder,
  setIsModalOrderOpen,
} from '../services/viewable-order/reducer';
import { FeedElement } from '../components/feed-element/feed-element';
import { wsProfileConnect, wsProfileDisconnect } from '../services/orders-profile-info/actions';

import ordersStyles from './orders.module.css';

export const OrdersPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(getProfileOrders);
  let token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(wsProfileConnect(`wss://norma.nomoreparties.space/orders`));
    return () => {
      dispatch(wsProfileDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={`${ordersStyles.section}`}>
      <div className={`${ordersStyles.body}`}>
        <div className={`${ordersStyles.feed_container}`}>
          <div className={`${ordersStyles.container} mt-10`}>
            {orders.map((orders) => (
              <Link
                key={orders._id}
                to={{
                  pathname: `/feed/${orders._id}`,
                  hash: '#order-info',
                }}
                state={{ backgroundLocation: location }}
                className={`${ordersStyles.link}`}
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
      </div>
    </section>
  );
};
