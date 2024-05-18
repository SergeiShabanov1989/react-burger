import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItemsStyles from './ingredients-items.module.css';

export const IngredientsItems = ({ image, name, price }) => {
  return (
    <div className={`${IngredientsItemsStyles.container} ml-4 mr-6`}>
      <Counter count={1} size="small" extraClass={IngredientsItemsStyles.count} />
      <img
        src={image}
        alt={name}
        className={`${IngredientsItemsStyles.image} ml-4 mr-4`}
      />
      <div className={IngredientsItemsStyles.price_container}>
        <p className="text_type_digits-default mt-1 mb-1 pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text_type_main-default">{name}</p>
    </div>
  );
};
