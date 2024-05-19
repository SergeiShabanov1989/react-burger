import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsItems } from '../ingridients-items/ingredients-items';
import { burgerStaticIngredients } from '../utils/data';
import { Popup } from '../popup/popup';

import ingredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const bunsIngredients = burgerStaticIngredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );
  const mainIngredients = burgerStaticIngredients.filter(
    (ingredient) => ingredient.type === 'main'
  );
  const sauceIngredients = burgerStaticIngredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [current, setCurrent] = useState('one');

  return (
    <section className={`${ingredientsStyles.section} mr-10`}>
      <h1 className={`${ingredientsStyles.text} text text_type_main-large mt-10 mb-5`}>
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
        <div className={ingredientsStyles.items_container}>
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
