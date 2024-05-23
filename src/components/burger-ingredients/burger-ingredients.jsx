import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsItems } from '../ingridients-items/ingredients-items';
import { Popup } from '../popup/popup';

import ingredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ isIngredients }) => {
  const [current, setCurrent] = useState('one');

  const bunsIngredients = isIngredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );
  const mainIngredients = isIngredients.filter(
    (ingredient) => ingredient.type === 'main'
  );
  const sauceIngredients = isIngredients.filter(
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
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
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
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
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
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
            />
          ))}
        </div>
      </div>

      <Popup />
    </section>
  );
};

BurgerIngredients.propTypes = {
  isIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
};
