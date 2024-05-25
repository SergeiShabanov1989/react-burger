import orderDetailsStyles from './order-details.module.css';
import imageDone from '../../images/done.png';

export const OrderDetails = () => {
  return (
    <div className={`${orderDetailsStyles.order_wrapper} mt-15 mb-15`}>
      <p
        className={`${orderDetailsStyles.order_number} text text_type_digits-large mb-8`}
      >
        034536
      </p>
      <h1
        className={`${orderDetailsStyles.order_text} text text_type_main-medium mb-10`}
      >
        идентификатор заказа
      </h1>
      <img
        src={imageDone}
        alt="вы успешно завершили заказ"
        className={`${orderDetailsStyles.image} mb-10`}
      />
      <p
        className={`${orderDetailsStyles.order_text} text text_type_main-small mb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.order_text} text text_type_main-small text_color_inactive mb-15`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
