import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/reducer';
import { getAllIngredients } from '../../services/burger-ingredients/reducer';
import { TOrder } from '../utils/types';
import feedElementStyles from './feed-element.module.css';

export const FeedElement = (orders: TOrder): JSX.Element => {
  const allIngredients = useSelector(getAllIngredients);
  const imageIngredients = allIngredients.filter((ingredient) => {
    return orders.ingredients.includes(ingredient._id);
  });

  const arrayWithImages = imageIngredients.map(
    (ingredient) => ingredient.image_mobile
  );
  const arrayWithPrice = imageIngredients.map((ingredient) => {
    if (ingredient.type === 'bun') {
      return 2 * ingredient.price;
    }
    return ingredient.price;
  });

  const totalPrice = arrayWithPrice.reduce((a, b) => a + b, 0);
  const orderDate = new Date(orders.createdAt);
  return (
    <div className={`${feedElementStyles.container} mb-6 mt-6 pl-6 pr-6`}>
      <div className={`${feedElementStyles.top_container} mb-6 mt-6`}>
        <p
          className={`${feedElementStyles.text} text text_type_digits-default`}
        >
          {`#${orders.number}`}
        </p>
        <FormattedDate
          date={new Date(orderDate)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <p
        className={`${feedElementStyles.name} text text_type_main-medium mb-6`}
      >
        {orders.name}
      </p>
      <div className={`${feedElementStyles.bottom_container} mb-6`}>
        <div className={feedElementStyles.ingredients_container}>
          {arrayWithImages.slice(0, 6).map((image) => (
            <img
              key={image}
              className={`${feedElementStyles.ingredient}`}
              src={image}
              alt="ingredient"
            />
          ))}
          {arrayWithImages.length > 6 && (
            <div className={`${feedElementStyles.count}`}>
              <p className="text text_type_main-default">
                +{arrayWithImages.length - arrayWithImages.slice(0, 6).length}
              </p>
            </div>
          )}
        </div>
        <div className={feedElementStyles.price_container}>
          <p
            className={`${feedElementStyles.text} text text_type_digits-default mr-2`}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
