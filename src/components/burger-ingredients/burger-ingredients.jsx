import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsItems } from '../ingridients-items/ingredients-items';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import {
  bunSelector,
  mainSelector,
  sauceSelector,
} from '../../services/burger-ingredients/selectors';

import ingredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const { IsModalOpen } = useSelector((state) => state.viewableIngredient);
  const bunIngredients = useSelector(bunSelector);
  const mainIngredients = useSelector(mainSelector);
  const sauceIngredients = useSelector(sauceSelector);
  const [current, setCurrent] = useState('one');

  return (
    <section className={`${ingredientsStyles.section} mr-10`}>
      <h1
        className={`${ingredientsStyles.text} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.container} mt-10`}>
        <h2
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="one"
        >
          Булки
        </h2>
        <div className={`${ingredientsStyles.items_container}`}>
          {bunIngredients.map((ingredient) => (
            <IngredientsItems key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <h2
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="two"
        >
          Соусы
        </h2>
        <div className={ingredientsStyles.items_container}>
          {sauceIngredients.map((ingredient) => (
            <IngredientsItems key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <h2
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="three"
        >
          Начинки
        </h2>
        <div className={ingredientsStyles.items_container}>
          {mainIngredients.map((ingredient) => (
            <IngredientsItems key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
      </div>

      {IsModalOpen && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};
