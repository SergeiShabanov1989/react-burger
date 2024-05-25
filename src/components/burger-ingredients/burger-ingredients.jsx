import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsItems } from '../ingridients-items/ingredients-items';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ingredientType } from '../utils/prop-types';

import ingredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState('one');
  const [choseIngredient, setChoseIngredient] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const bunsIngredients = ingredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );
  const mainIngredients = ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  );
  const sauceIngredients = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

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
          {bunsIngredients.map((ingredient) => (
            <IngredientsItems
              key={ingredient._id}
              setChoseIngredient={setChoseIngredient}
              ingredient={ingredient}
              setIsOpenModal={setIsOpenModal}
            />
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
            <IngredientsItems
              key={ingredient._id}
              ingredient={ingredient}
              setChoseIngredient={setChoseIngredient}
              setIsOpenModal={setIsOpenModal}
            />
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
            <IngredientsItems
              key={ingredient._id}
              ingredient={ingredient}
              setChoseIngredient={setChoseIngredient}
              setIsOpenModal={setIsOpenModal}
            />
          ))}
        </div>
      </div>

      {isOpenModal && (
        <Modal setIsOpenModal={setIsOpenModal}>
          <IngredientDetails choseIngredient={choseIngredient} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
