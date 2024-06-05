import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../utils/prop-types';
import {
  setViewableIngredient,
  setIsModalIngredientOpen,
} from '../../services/viewable-ingredient/reducer';
import { setConstructorIngredients } from '../../services/constructor-ingredients/reducer';

import ingredientsItemsStyles from './ingredients-items.module.css';

export const IngredientsItems = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { constructorIngredients, buns } = useSelector(
    (state) => state.constructorIngredients
  );
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
  });

  const countBuns = buns !== null && buns._id === ingredient._id ? 2 : 0;

  const countIngredients = constructorIngredients.filter(
    (i) => i._id === ingredient._id
  ).length;

  const { image, name, price } = ingredient;

  const handleOnClick = () => {
    dispatch(setViewableIngredient(ingredient));
    dispatch(setConstructorIngredients(ingredient));
    dispatch(setIsModalIngredientOpen(true));
  };
  return (
    !isDrag && 
    <div
      className={`${ingredientsItemsStyles.container} ml-4 mr-6 mt-4`}
      onClick={handleOnClick}
      ref={dragRef}
    >
      <Counter
        count={countIngredients || countBuns}
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
  ingredient: PropTypes.shape(ingredientType.isRequired),
};
