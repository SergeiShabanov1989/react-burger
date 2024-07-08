import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  setViewableIngredient,
  setIsModalIngredientOpen,
} from '../../services/viewable-ingredient/reducer';
import { TIngredient } from '../utils/types';

import ingredientsItemsStyles from './ingredients-items.module.css';

export const IngredientsItems = ({
  ingredient,
}: {
  ingredient: TIngredient;
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const { constructorIngredients, buns } = useSelector(
    // @ts-ignore
    (state) => state.constructorIngredients
  );
  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  const countBuns = buns !== null && buns._id === ingredient._id ? 2 : 0;

  const countIngredients = constructorIngredients.filter(
    (i: TIngredient) => i._id === ingredient._id
  ).length;

  const { image, name, price } = ingredient;

  const handleOnClick = () => {
    dispatch(setViewableIngredient(ingredient));
    dispatch(setIsModalIngredientOpen(true));
  };
  return (
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
