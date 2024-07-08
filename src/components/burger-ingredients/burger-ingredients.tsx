import { useState, useRef, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsItems } from '../ingridients-items/ingredients-items';
import {
  bunSelector,
  mainSelector,
  sauceSelector,
} from '../../services/burger-ingredients/selectors';
import { TIngredient } from '../utils/types';

import ingredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = (): JSX.Element => {
  const location = useLocation();
  const bunIngredients = useSelector(bunSelector);
  const mainIngredients = useSelector(mainSelector);
  const sauceIngredients = useSelector(sauceSelector);
  const [current, setCurrent] = useState('one');
  const refBuns = useRef<HTMLDivElement | null>(null);
  const refMain = useRef<HTMLDivElement | null>(null);
  const refSauce = useRef<HTMLDivElement | null>(null);
  const hoverBoundingRectBuns = refBuns.current?.getBoundingClientRect()?.top;
  const hoverBoundingRectMain = refMain.current?.getBoundingClientRect()?.top;
  const hoverBoundingRectSauce = refSauce.current?.getBoundingClientRect()?.top;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.scrollTop >= (hoverBoundingRectBuns ?? 0) &&
      e.currentTarget.scrollTop < (hoverBoundingRectSauce ?? 0)
    ) {
      setCurrent('one');
    } else if (
      e.currentTarget.scrollTop >= (hoverBoundingRectSauce ?? 0) &&
      e.currentTarget.scrollTop < (hoverBoundingRectMain ?? 0)
    ) {
      setCurrent('two');
    } else if (e.currentTarget.scrollTop > (hoverBoundingRectMain ?? 0)) {
      setCurrent('three');
    }
  };

  return (
    <section className={`${ingredientsStyles.section} mr-10`}>
      <h1
        className={`${ingredientsStyles.text} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab
          value="one"
          active={current === 'one'}
          onClick={() => {
            setCurrent('one');
          }}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === 'two'}
          onClick={() => {
            setCurrent('two');
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === 'three'}
          onClick={() => {
            setCurrent('three');
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
        onScroll={(e) => handleScroll(e)}
        className={`${ingredientsStyles.container} mt-10`}
      >
        <h2
          ref={refBuns}
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="one"
        >
          Булки
        </h2>
        <div className={`${ingredientsStyles.items_container}`}>
          {bunIngredients.map((ingredient: TIngredient) => (
            <Link
              key={ingredient._id}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                hash: '#modal-ingredient',
              }}
              state={{ backgroundLocation: location }}
              className={ingredientsStyles.link}
            >
              <IngredientsItems key={ingredient._id} ingredient={ingredient} />
            </Link>
          ))}
        </div>
        <h2
          ref={refSauce}
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="two"
        >
          Соусы
        </h2>
        <div className={ingredientsStyles.items_container}>
          {sauceIngredients.map((ingredient: TIngredient) => (
            <Link
              key={ingredient._id}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                hash: '#modal-ingredient',
              }}
              state={{ backgroundLocation: location }}
              className={ingredientsStyles.link}
            >
              <IngredientsItems key={ingredient._id} ingredient={ingredient} />
            </Link>
          ))}
        </div>
        <h2
          ref={refMain}
          className={`${ingredientsStyles.text} text text_type_main-medium mt-10 mb-6`}
          id="three"
        >
          Начинки
        </h2>
        <div className={ingredientsStyles.items_container}>
          {mainIngredients.map((ingredient: TIngredient) => (
            <Link
              key={ingredient._id}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                hash: '#modal-ingredient',
              }}
              state={{ backgroundLocation: location }}
              className={ingredientsStyles.link}
            >
              <IngredientsItems key={ingredient._id} ingredient={ingredient} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
