import { useRef } from 'react';
import { useDispatch, useSelector } from '../../services/reducer';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  deleteIngredients,
  moveIngredient,
} from '../../services/constructor-ingredients/reducer';

import { TConstructorIngredient } from '../utils/types';

import constructorIngredientsStyles from './constructor-ingredients.module.css';

type TConstructorIngredients = {
  ingredient: TConstructorIngredient;
  index: number;
  id: string;
};

export const ConstructorIngredients = ({
  ingredient,
  index,
  id,
}: TConstructorIngredients): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(
    (state) => state.constructorIngredients
  );
  const [, drag] = useDrag<Pick <TConstructorIngredients, 'id' | 'index'>, unknown>({
    type: 'ingredient',
    item: () => {
      return { id, index };
    },
  });

  const [, drop] = useDrop<TConstructorIngredients, unknown>({
    accept: 'ingredient',
    hover(ingredient, monitor) {
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (hoverBoundingRect) {
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }
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
