import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../utils/prop-types';
import {
  deleteIngredients,
  moveIngredient,
} from '../../services/constructor-ingredients/reducer';

import constructorIngredientsStyles from './constructor-ingredients.module.css';

export const ConstructorIngredients = ({ ingredient, index, id }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(
    (state) => state.constructorIngredients
  );
  const [, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { id, index };
    },
  });

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(ingredient, monitor) {
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      const ingredients = [...constructorIngredients];
      ingredients.splice(index, 0, ingredients.splice(ingredient.index, 1)[0]);
      dispatch(moveIngredient(ingredients));
      ingredient.index = hoverIndex;
    },
  });
  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        key={ingredient.key}
        className={`${constructorIngredientsStyles.ingredient_wrapper} mr-2`}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => dispatch(deleteIngredients(ingredient.key))}
        />
      </div>
    </>
  );
};

ConstructorIngredients.propTypes = {
  ingredient: PropTypes.shape(ingredientType.isRequired),
};
