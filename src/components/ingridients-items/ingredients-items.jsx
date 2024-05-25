import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../utils/prop-types';

import ingredientsItemsStyles from './ingredients-items.module.css';

export const IngredientsItems = ({
  setChoseIngredient,
  ingredient,
  setIsOpenModal,
}) => {
  const { image, name, price } = ingredient;
  const handleOnClick = () => {
    setChoseIngredient(ingredient);
    setIsOpenModal(true);
  };
  return (
    <div
      className={`${ingredientsItemsStyles.container} ml-4 mr-6 mt-4`}
      onClick={handleOnClick}
    >
      <Counter
        count={1}
        size="small"
        extraClass={ingredientsItemsStyles.count}
      />
      <img
        src={image}
        alt={name}
        className={`${ingredientsItemsStyles.image} ml-4 mr-4`}
      />
      <div className={ingredientsItemsStyles.price_container}>
        <p className="text text_type_digits-default mt-1 mb-1 pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
};

IngredientsItems.propTypes = {
  setChoseIngredient: PropTypes.func.isRequired,
  ingredient: PropTypes.shape(ingredientType.isRequired),
  setIsOpenModal: PropTypes.func.isRequired,
};
