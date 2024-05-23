import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItemsStyles from './ingredients-items.module.css';

export const IngredientsItems = ({
  image,
  name,
  price,
  setIsChoseIngredient,
  ingredient,
  setIsOpenModal,
}) => {
  const handleOnClick = () => {
    setIsChoseIngredient(ingredient);
    setIsOpenModal(true);
  };
  return (
    <div
      className={`${IngredientsItemsStyles.container} ml-4 mr-6 mt-4`}
      onClick={handleOnClick}
    >
      <Counter
        count={1}
        size="small"
        extraClass={IngredientsItemsStyles.count}
      />
      <img
        src={image}
        alt={name}
        className={`${IngredientsItemsStyles.image} ml-4 mr-4`}
      />
      <div className={IngredientsItemsStyles.price_container}>
        <p className="text text_type_digits-default mt-1 mb-1 pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
};

IngredientsItems.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
