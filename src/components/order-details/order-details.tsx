import { useSelector } from '../../services/reducer';
import orderDetailsStyles from './order-details.module.css';
import imageDone from '../../images/done.png';
import { Preloader } from '../preloader/preloader';

export const OrderDetails = (): JSX.Element => {
  const { order, isLoading } = useSelector((state) => state.constructorIngredients);
  return (
    <div className={`${orderDetailsStyles.order_wrapper} mt-15 mb-15`}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <p
            data-testid="order-number" className={`${orderDetailsStyles.order_number} text text_type_digits-large mb-8`}
          >
            {!order ? 0 : order.order?.number}
          </p>
          <h1
            className={`${orderDetailsStyles.order_text} text text_type_main-medium mb-10`}
          >
            {order
              ? 'Идентификатор заказа'
              : 'произошла ошибка, повторите заказ'}
          </h1>
          <img
            src={imageDone}
            alt="вы успешно завершили заказ"
            className={`${orderDetailsStyles.image} mb-10`}
          />
          <p
            className={`${orderDetailsStyles.order_text} text text_type_main-small mb-2 pl-6 pr-6`}
          >
            Ваш{' '}
            {order
              ? `"${order.name}" начали готовить`
              : 'произошла ошибка, повторите заказ'}
          </p>
          <p
            className={`${orderDetailsStyles.order_text} text text_type_main-small text_color_inactive mb-15`}
          >
            {order
              ? 'Дождитесь готовности на орбитальной станции'
              : 'повторите заказ на орбитальной станции'}
          </p>
        </>
      )}
    </div>
  );
};
